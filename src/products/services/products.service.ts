import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  createProduct(name: string, price: number) {
    const product = this.productRepo.create({ name, price });
    return this.productRepo.save(product);
  }

  async updateProduct(id: number, attr: Partial<Product>) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    const updatedProduct = Object.assign(product, attr);
    return this.productRepo.save(updatedProduct);
  }

  async deleteProduct(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return this.productRepo.remove(product);
  }

  async viewProduct(id: number) {
    const product = await this.productRepo.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found!');
    }
    return product;
  }
}
