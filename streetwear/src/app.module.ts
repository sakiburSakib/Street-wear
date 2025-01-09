import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { ProductEntity } from 'src/db/entities/product-entities';

@Module({
  imports: [ProductModule,
    ConfigModule.forRoot({ isGlobal: true }), // Load .env configuration
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [ProductEntity],
        synchronize: true,
        logging: true,
      }),
    }),
    ProductModule,
  ],
})
export class AppModule {}