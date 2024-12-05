import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { Usuario } from 'src/common/decorators/usuario.decorator';
import { UpdateUsuarioDto } from 'src/usuario/dto/update-usuario.dto';
import { Response } from 'express';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  // Metodos solo para usuario SuperAdmin/Admin --------------------------->
  @Post()
  async create(
    @Body() createProductoDto: CreateProductoDto,
    @Usuario() isAdmin: UpdateUsuarioDto,
    @Res() response: Response,
  ) {
    if (isAdmin.rol === 'user') {
      return response.status(401).json({
        message: 'No tiene permisos de administrador',
      });
    }

    try {
      return this.productoService.create(createProductoDto).then((res) => {
        response.status(201).json({
          message: 'Producto agregado correctamente',
          data: res,
        });
      });
    } catch (err) {
      response.status(400).json({
        message: 'Error al agregar el producto',
        error: err,
      });
    }
  }

  // Metodos solo para usuario SuperAdmin/Admin/Usuario --------------------------->
  @Get()
  async findAll() {
    return this.productoService.findAll();
  }

  // Metodos solo para usuario SuperAdmin/Admin/Usuario --------------------------->
  @Get(':id')
  async findOne(@Param('id') id: number, @Res() response: Response) {
    try {
      const res = await this.productoService.findOne(id);
      return response.status(200).json(res);
    } catch (err) {
      return response
        .status(404)
        .json({ message: 'No se encontro el producto', error: err });
    }
  }

  // Metodos solo para usuario SuperAdmin --------------------------->
  @Patch('update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateProductoDto: UpdateProductoDto,
    @Usuario() isAdmin: UpdateUsuarioDto,
    @Res() response: Response,
  ) {
    if (isAdmin.rol === 'user' || isAdmin.rol === 'admin') {
      return response.status(401).json({
        message: 'No tiene permisos de super administrador',
      });
    }

    try {
      return this.productoService.update(id, updateProductoDto).then((res) => {
        response.status(200).json({
          message: 'Producto actualizado correctamente',
          data: res,
        });
      });
    } catch (err) {
      return response.status(400).json({
        message: 'Error al actualizar el producto',
        error: err,
      });
    }
  }

  // Metodos solo para usuario SuperAdmin/Admin --------------------------->
  @Delete('delete/:id')
  async remove(
    @Param('id') id: number,
    @Usuario() isAdmin: UpdateUsuarioDto,
    @Res() response: Response,
  ) {
    if (isAdmin.rol === 'user') {
      return response.status(401).json({
        message: 'No tiene permisos de administrador',
      });
    }

    try {
      return this.productoService.remove(id).then(() => {
        response.status(200).json({
          message: 'Producto eliminado correctamente',
        });
      });
    } catch (err) {
      return response.status(404).json({
        message: 'Producto no encontrado',
        error: err,
      });
    }
  }
}
