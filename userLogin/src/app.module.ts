import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { ProductEntity } from 'src/db/entities/product-entities';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from 'src/db/entities/user.entity'; // Import UserEntity here

@Module({
  imports: [
    ProductModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'), 
        port: configService.get<number>('DB_PORT'), // Read from .env
        username: configService.get('DB_USERNAME'), // Read from .env
        password: configService.get('DB_PASSWORD'), // Read from .env
        database: configService.get('DB_NAME'), // Read from .env
        entities: [
          ProductEntity, // Include ProductEntity here
          UserEntity, // Add UserEntity so it's recognized
        ],
        synchronize: true, // Sync database schema automatically (use cautiously in production)
        logging: 'all', // Enable query logging (helpful for debugging)
      }),
    }),
  ],
})
export class AppModule {}
