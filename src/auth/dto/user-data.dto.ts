import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UsuarioDto extends PartialType(RegisterAuthDto) {
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  id!: number;
}
