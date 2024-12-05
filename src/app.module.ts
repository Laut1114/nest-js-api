import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsuarioModule } from './usuario/usuario.module';
import { GUARD_KEY } from './common/keys/guard.key';
import { JwtGuard } from './auth/jwt.guard';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [AuthModule, UsuarioModule, ProductoModule],
  controllers: [AppController],
  providers: [AppService, { provide: GUARD_KEY, useClass: JwtGuard }],
})
export class AppModule {}
