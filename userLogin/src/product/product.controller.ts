import { Body, Controller,UseGuards, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/update.product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('product')
//@UseGuards(JwtAuthGuard) 
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('createProduct')
  async createProduct(@Body() data: CreateProductDto) {
    return await this.productService.createProduct(data);
  }

  @Get()
  async getAllProducts() {
    return await this.productService.getAllProducts();
  }

  @Get('/:id')
  async getProductById(@Param('id') id: string) {
    return await this.productService.getProductById(id);
  }

  @Patch('updateProduct/:id')
  async updateProduct(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return await this.productService.updateProduct(id, data);
  }

  @Delete('deleteProduct/:id') // Route is `/product/deleteProduct/:id`
  async deleteProduct(@Param('id') id: string) {
    return await this.productService.deleteProduct(id);
  }

  @Patch('buyProduct/:id')
  async buyProduct(@Param('id') id: string, @Body() data: { quantity: number }) {
    return await this.productService.buyProduct(id, data.quantity);
  }
}
