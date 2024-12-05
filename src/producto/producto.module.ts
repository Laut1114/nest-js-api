import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { AdminGuard } from 'src/common/rol-permission.guard';

@Module({
  controllers: [ProductoController],
  providers: [
    ProductoService,
    {
      provide: 'ROL_ADMIN',
      useClass: AdminGuard,
    },
    {
      provide: 'ROL_SUPERADMIN',
      useClass: AdminGuard,
    },
  ],
})
export class ProductoModule {}
