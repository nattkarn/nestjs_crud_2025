import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = await this.prisma.product.create({
        data: {
          name: createProductDto.name,
          description: createProductDto.description || null,
          price: createProductDto.price,
        },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
        },
      });

      return {
        message: 'Product created successfully',
        product,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async findAll() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.findOne(id); // ตรวจว่ามีอยู่จริง

    return this.prisma.product.update({
      where: { id },
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description || null,
        price: updateProductDto.price,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // ตรวจว่ามีอยู่จริง

    return this.prisma.product.delete({
      where: { id },
    });
  }
}
