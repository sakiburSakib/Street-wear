import { Injectable, ConflictException, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/db/entities/user.entity';  // Correct path to UserEntity
import { SignupDto } from './dto/signup.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';  // Inject JwtService

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,  // Inject repository here
    private readonly jwtService: JwtService,  // Inject JwtService here
  ) {}

  async signup(signupDto: SignupDto) {
    try {
      const { email, password, name, gender } = signupDto;

      // Check if the email already exists
      const existingUser = await this.userRepository.findOneBy({ email });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the user
      const user = this.userRepository.create({
        email,
        password: hashedPassword,
        name,
        gender,
      });

      // Log to check if user is created correctly
      console.log('Saving user:', user);

      await this.userRepository.save(user);

      return { message: 'User created successfully', user };
    } catch (error) {
      // Log detailed error information
      console.error('Error in signup:', error);
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async login(email: string, password: string) {
    try {
      // Check if the user exists
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      // Check if the password is correct
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid credentials');
      }

      // Generate the JWT token
      const token = this.jwtService.sign({ id: user.id, email: user.email });
      return { message: 'Login successful', token };
    } catch (error) {
      console.error(error);  // Log the error for better debugging
      throw new InternalServerErrorException('Error logging in user');
    }
  }
  
}
