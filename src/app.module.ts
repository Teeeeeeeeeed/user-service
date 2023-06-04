import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/user.model';


@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect:'postgres',
      host:'localhost',
      port:5432,
      username:'postgres',
      password:'password',
      database:'user-service',
      models:[User]
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
