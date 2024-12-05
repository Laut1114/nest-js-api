import {
  BadRequestException,
  Injectable,
  Logger,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { PrismaClient } from '@prisma/client';
import { LoginAuthDto } from './dto/login-auth.dto';
import * as bcrypt from 'bcrypt';
import { PayloadInterface } from 'src/common/payload';
import { JwtService } from '@nestjs/jwt';
import { UsuarioDto } from './dto/user-data.dto';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  private readonly logger = new Logger('Auth: ');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Conectado a la base de datos');
  }

  // Encriptar contraseña y validar contraseña ----------------------->
  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
  }

  async checkPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
  // <-----------------------------------------------------------------

  // JWT ------------------------------------------------------------->
  createToken(user: UsuarioDto) {
    const payload: PayloadInterface = {
      id: user.id,
      email: user.email!,
      rol: user.rol!,
    };

    const token = this.jwtService.sign(payload);

    console.log('Token: ' + token);

    return token;
  }

  verifyToken(token: string): PayloadInterface {
    return this.jwtService.verify(token);
  }
  // <----------------------------------------------------------------

  async register(createUserDto: RegisterAuthDto) {
    const { email, password } = createUserDto;
    const verifyEmail = await this.user.findFirst({ where: { email } });

    if (verifyEmail) throw new BadRequestException('Email ya registrado');

    const hashPassword = await this.hashPassword(password);
    return this.user.create({
      data: { ...createUserDto, password: hashPassword },
    });
  }

  async login(credentials: LoginAuthDto) {
    const { email, password } = credentials;
    const user = await this.user.findUnique({ where: { email } });

    if (!user) throw new UnauthorizedException('User not found');

    const isPasswordValid = await this.checkPassword(password, user.password);

    if (!isPasswordValid) throw new UnauthorizedException('Invalid password');

    const userToken = {
      id: user.id,
      email: user.email,
      rol: user.rol,
    };

    const token = this.createToken(userToken);

    return { user, token };
  }

  async findUser(id: number) {
    const user = await this.user.findUnique({ where: { id } });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}
