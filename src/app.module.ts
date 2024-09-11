import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TbankModule } from './tbank/tbank.module';
import { ConfigModule } from '@nestjs/config';
import * as process from 'node:process';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseFloat(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    TbankModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
