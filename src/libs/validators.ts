import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { UserService } from '../user/user.service';
import { Injectable } from "@nestjs/common";

@ValidatorConstraint({ name: 'MatchPasswords', async: false })
export class MatchPasswords implements ValidatorConstraintInterface {
   validate(password: string, args: ValidationArguments) {

      if (password !== (args.object as any)[args.constraints[0]]) return false;
      return true;
   }

   defaultMessage(args: ValidationArguments) {
      return "Passwords do not match!";
   }
}

/**
 * Checks if the email is in use
 */
@ValidatorConstraint({ name: 'UniqueEmail', async: true})
@Injectable()
export class UniqueEmail implements ValidatorConstraintInterface {
    constructor(private readonly userService: UserService){}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const user = await this.userService.existingEmail(value);
        return user ? false : true;
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        return "Email already in use"
    }
}