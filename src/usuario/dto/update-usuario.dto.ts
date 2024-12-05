import { RegisterAuthDto } from 'src/auth/dto/register-auth.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateUsuarioDto extends PartialType(RegisterAuthDto) {}
