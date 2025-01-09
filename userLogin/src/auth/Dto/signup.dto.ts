import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class SignupDto {
    @IsString()
    name: string;
  
    @IsEmail()
    email: string;
  
    @IsString()
    password: string;
  
    @IsOptional()
    @IsString()
    gender?: string;
  }
  
