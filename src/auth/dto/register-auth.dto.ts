import { IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

export class RegisterAuthDto {
  @IsEmail()
  email!: string;

  @IsString()
  password!: string;

  @IsString()
  @IsOptional()
  nombre?: string;

  @IsString()
  @IsOptional()
  apellido?: string;

  @IsIn(['superadmin', 'admin', 'user'])
  rol!: string;
}
