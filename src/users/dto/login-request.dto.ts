import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  username: string;

  @IsNotEmpty({ message: 'password is mandatory' })
  password: string;
}
