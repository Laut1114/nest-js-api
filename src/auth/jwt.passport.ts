import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PayloadInterface } from 'src/common/payload';
import { envs } from 'src/config';
import { AuthService } from './auth.service';

@Injectable()
export class JwtPassport extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      // Extraer el JWT token del header
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      // No ignora la expiracion
      ignoreExpiration: false,

      // Asignar la secret key
      secretOrKey: envs.jwtSeed,
    });
  }

  async validate(payload: PayloadInterface) {
    try {
      // Retornar el usuario del payload
      return await this.authService.findUser(payload.id);
    } catch (error) {
      throw new UnauthorizedException('Token no valido' + error);
    }
  }
}
