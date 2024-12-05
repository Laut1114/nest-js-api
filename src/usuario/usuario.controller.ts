import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Res,
} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from 'src/common/decorators/usuario.decorator';
import { Response } from 'express';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  // Metodos solo para usuario SuperAdmin --------------------------->

  // Metodo para obtener todos los usuarios
  @Get()
  findAll(@Usuario() isAdmin: UpdateUsuarioDto, @Res() response: Response) {
    if (isAdmin.rol === 'superadmin') return this.usuarioService.findAll();

    return response
      .status(401)
      .json({ message: 'No tiene permisos de super administrador' });
  }

  // Metodo para obtener un usuario
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
    @Usuario() isAdmin: UpdateUsuarioDto,
    @Res() response: Response,
  ) {
    if (isAdmin.rol === 'superadmin')
      return this.usuarioService
        .findOne(id)
        .catch((err) => response.status(400).json({ message: err }));

    return response
      .status(401)
      .json({ message: 'No tiene permisos de super administrador' });
  }

  // Metodo para actualizar un usuario
  @Patch('update/:id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUsuarioDto: UpdateUsuarioDto,
    @Usuario() isAdmin: UpdateUsuarioDto,
    @Res() response: Response,
  ) {
    if (isAdmin.rol === 'superadmin')
      return this.usuarioService
        .update(id, updateUsuarioDto)
        .then((res) => {
          return response.status(200).json({
            message: 'Usuario actualizado correctamente',
            data: res,
          });
        })
        .catch((err) =>
          response.status(400).json({
            message: 'Hubo un error al actualizar el usuario',
            error: err,
          }),
        );

    return response
      .status(401)
      .json({ message: 'No tiene permisos de super administrador' });
  }

  // Metodo para eliminar un usuario
  @Delete('delete/:id')
  remove(
    @Param('id', ParseIntPipe) id: number,
    @Usuario() isAdmin: UpdateUsuarioDto,
    @Res() response: Response,
  ) {
    if (isAdmin.rol === 'superadmin')
      return this.usuarioService
        .remove(id)
        .then(() =>
          response
            .status(200)
            .json({ message: 'Usuario eliminado correctamente' }),
        )
        .catch((err) => response.status(400).json({ message: err }));

    return response
      .status(401)
      .json({ message: 'No tiene permisos de super administrador' });
  }
}
