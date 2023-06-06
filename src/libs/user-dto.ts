import { IsEmail, IsMobilePhone, IsNotEmpty, IsString, Matches, MaxLength, MinLength, Validate } from 'class-validator';
import { MatchPasswords } from "./validators";


export class CreateUserDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
  password: string;

  @Validate(MatchPasswords, ['password'])
  passwordConfirmation: string;

  @IsMobilePhone()
  mobile?: string;
}

export class LoginUser { 
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}