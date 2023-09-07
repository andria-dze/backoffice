import * as dotenv from 'dotenv';

dotenv.config();

const getParams = () =>
  ({
    DATABASE: {
      PORT: Number(process.env.DATABASE_PORT) || 5432,
      HOST: process.env.DATABASE_HOST || 'localhost',
      USERNAME: process.env.DATABASE_USER || 'docker',
      PASSWORD: process.env.DATABASE_PASSWORD || 'docker',
      NAME: process.env.DATABASE_NAME || 'backoffice',
    },
    APP: {
      BACKEND_PORT: process.env.BACKEND_PORT || 3001,
      ENV: process.env.ENV || 'dev',
    },
    GRAPHQL: {
      GRAPHQL_GATEWAY_PUBLIC_KEY:
        process.env.GRAPHQL_GATEWAY_PUBLIC_KEY || 'some_key',
    },
    AUTH: {
      JWT_SECRET: process.env.JWT_SECRET || 'some_random_key',
    },
  }) as const;

const CONFIG = {
  PARAMS: getParams(),
};

export { CONFIG };
