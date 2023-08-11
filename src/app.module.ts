import * as path from 'path';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './domain/auth/auth.module';
import { UsersModule } from './domain/users/users.module';
import { CONFIG } from './infra/config/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: CONFIG.PARAMS.DATABASE.PORT,
      host: CONFIG.PARAMS.DATABASE.HOST,
      username: CONFIG.PARAMS.DATABASE.USERNAME,
      password: CONFIG.PARAMS.DATABASE.PASSWORD,
      database: CONFIG.PARAMS.DATABASE.NAME,
      autoLoadEntities: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      definitions: {
        path: path.join(
          process.cwd(),
          'src/domain/graphql-type-definitions/graphql.ts',
        ),
      },
    }),
    UsersModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: CONFIG.PARAMS.AUTH.JWT_SECRET,
      signOptions: { expiresIn: '61s' },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
