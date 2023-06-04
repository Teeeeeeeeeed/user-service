import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { CreateUserDto, LoginUser } from '../libs/User';
import { UserService } from './user.service';
import { Request } from 'express';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async create(@Body() createdUser: CreateUserDto){
    return this.userService.createUser(createdUser);
  }

  @Get('')
  async health(@Req() request: Request) {
    const bearerToken = request.headers.authorization.split(' ');
    if (bearerToken.length > 1) this.userService.verify(bearerToken[1]);
    return ;
  }

  @Post('login')
  async login(@Body() login: LoginUser) {
    return this.userService.login(login);
  }
}
