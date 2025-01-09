import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from 'src/db/entities/product-entities';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [
    DbModule, // Import DbModule with DataSource
    TypeOrmModule.forFeature([ProductEntity]), // Register ProductEntity
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [TypeOrmModule],
})
export class ProductModule {}