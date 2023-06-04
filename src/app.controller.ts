import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { CreatedUser } from './libs/User';

@Controller('auth')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  async create(@Body() createdUser: CreatedUser){
     
  }
}
