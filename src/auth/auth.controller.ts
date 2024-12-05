import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Public() // Decorador para marcar la ruta como pública
  register(@Body() createUsuarioDto: RegisterAuthDto) {
    return this.authService.register(createUsuarioDto);
  }

  @Post('login')
  @Public() // Decorador para marcar la ruta como pública
  login(@Body() userCredentials: LoginAuthDto) {
    return this.authService.login(userCredentials);
  }
}
