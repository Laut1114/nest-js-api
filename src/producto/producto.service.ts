import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductoService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Productos: ');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Conectado a la base de datos');
  }

  create(createProductoDto: CreateProductoDto) {
    return this.product.create({ data: createProductoDto });
  }

  findAll() {
    return this.product.findMany();
  }

  findOne(id: number) {
    return this.product.findUnique({ where: { id } });
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return this.product.update({ where: { id }, data: updateProductoDto });
  }

  remove(id: number) {
    return this.product.delete({ where: { id } });
  }
}
