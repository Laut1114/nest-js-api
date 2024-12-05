import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre!: string;

  @IsString()
  descripcion!: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  precio!: number;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  cantidad!: number;
}
