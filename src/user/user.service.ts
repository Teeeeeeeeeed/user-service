import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, LoginUser } from 'src/libs/user-dto';
import * as bcrypt from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userModel:typeof User){}

    async existingEmail(email: string) {
        return await this.userModel.findOne({
            where: {email}
        })
    }

    async createUser(newUser: CreateUserDto) {
        const {passwordConfirmation, ...user} = newUser;
        const salt = await bcrypt.genSalt(parseInt(process.env.NUMBER_SALT));
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        await this.userModel.create(user)
    }

    async login(userLogin: LoginUser) {
        const user = await this.userModel.findOne({
            where:{ email: userLogin.email}
        })
        if (bcrypt.compare(userLogin.password, user.password)) {
            const details = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email:user.email,
                mobile: user.mobile,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                exp: Math.floor(Date.now() / 1000 + (60 * 60))
            }
            const token = sign(details,process.env.JWT_SECRET)
            return token;
        } else {
            throw new HttpException("Email or Password Incorrect", HttpStatus.UNAUTHORIZED)
        }
    }

    verify(token: string) {
        try {
            const decoded = verify(token, process.env.JWT_SECRET);
            return decoded;
        } catch (e) {
            throw new HttpException("Token is invalid", HttpStatus.UNAUTHORIZED)
        }
    }
}
