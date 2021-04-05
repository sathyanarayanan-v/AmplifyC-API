import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'username is mandatory' })
  username: string;

  @IsNotEmpty({ message: 'password is mandatory' })
  password: string;
}

export class NewUser extends CreateUserDto {
  passwordHash: string;
  passwordSalt: string;
}
