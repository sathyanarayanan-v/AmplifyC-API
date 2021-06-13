import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginRequestDto {
  @IsString({ message: 'username is required' })
  @IsNotEmpty({ message: 'Please check your username and password' })
  username: string;

  @IsNotEmpty({ message: 'Please check your username and password' })
  password: string;
}
