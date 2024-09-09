import { Controller, Get, Post, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Notes')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('create')
  createHello(@Res() res: Response) {
    //return this.appService.createHello();
    res.status(HttpStatus.CREATED).send();
  }
}
