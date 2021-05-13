import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @IsEmail({}, { message: 'Please check your username and password' })
  username: string;

  @IsNotEmpty({ message: 'Please check your username and password' })
  password: string;
}
