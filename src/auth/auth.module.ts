import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtPassport } from './jwt.passport';
import { envs } from 'src/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtPassport],
  imports: [
    JwtModule.register({
      secret: envs.jwtSeed,
      signOptions: { expiresIn: '24h' },
    }),
  ],
})
export class AuthModule {}
