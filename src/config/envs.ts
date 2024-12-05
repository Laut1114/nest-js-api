import 'dotenv/config';
import joi from 'joi';

interface EnvConfig {
  PORT: number;
  DATABASE_URL: string;
  JWT_SEED: string;
}

// Configuracion del esquema joi
const envConfigSchema = joi
  .object<EnvConfig>({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    JWT_SEED: joi.string().required(),
  })
  .unknown(true);

// Validar las variables de entorno
const { error, value } = envConfigSchema.validate(process.env);

// En caso de error
if (error) throw new Error(`Config validation error: ${error.message}`);

// Sino se obtienen las variables
const envVars: EnvConfig = value;

// Exportar
export const envs = {
  port: envVars.PORT,
  dbUrl: envVars.DATABASE_URL,
  jwtSeed: envVars.JWT_SEED,
};
