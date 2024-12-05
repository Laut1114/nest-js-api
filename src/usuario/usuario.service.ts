import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UsuarioService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('Usuarios: ');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Conectado a la base de datos');
  }

  create(createUsuarioDto: RegisterAuthDto) {
    return this.user.create({
      data: createUsuarioDto,
    });
  }

  findAll() {
    return this.user.findMany();
  }

  findOne(id: number) {
    return this.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return this.user.update({
      where: {
        id,
      },
      data: updateUsuarioDto,
    });
  }

  remove(id: number) {
    return this.user.delete({
      where: {
        id,
      },
    });
  }
}
