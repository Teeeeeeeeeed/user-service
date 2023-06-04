import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/user.model';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UniqueEmail } from './libs/validators';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect:'postgres',
      host:'localhost',
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE,
      models:[User]
    }),
    SequelizeModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [UniqueEmail, UserService],
})
export class AppModule {}
