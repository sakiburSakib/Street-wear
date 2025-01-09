import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductEntity } from 'src/db/entities/product-entities';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  // Create a product
  async createProduct(data: CreateProductDto) {
    const product = this.productRepository.create(data);
    await this.productRepository.save(product);
    return { message: 'Product created successfully', product };
  }

  // Get all products
  async getAllProducts() {
    const products = await this.productRepository.find();
    if (!products.length) {
      throw new NotFoundException('No products found');
    }
    return { message: 'Products retrieved successfully', products };
  }

  // Get a product by ID
  async getProductById(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product retrieved successfully', product };
  }

  // Update a product
  async updateProduct(id: string, data: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.update(id, data);
    return { message: 'Product updated successfully', updatedProduct: { ...product, ...data } };
  }

  // Delete a product
  async deleteProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    await this.productRepository.delete(id);
    return { message: 'Product deleted successfully' };
  }

   // Buy a product (decrease the quantity)
  async buyProduct(id: string, quantity: number) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    
    if (product.quantity < quantity) {
      throw new NotFoundException('Out of stock');
    }

    product.quantity -= quantity;
    await this.productRepository.save(product);

    return { message: 'Product purchased successfully', product };
  }
}
