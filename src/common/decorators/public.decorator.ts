import { SetMetadata } from '@nestjs/common';
import { IS_PUBLIC_KEY } from '../keys/public.key';

// Este decorador agrega metadatos para marcar una ruta como pública
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
