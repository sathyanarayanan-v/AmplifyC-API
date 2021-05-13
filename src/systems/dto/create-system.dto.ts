import { IsEmail, IsString } from 'class-validator';

export class CreateSystemDto {
  @IsEmail()
  username: string;

  @IsString({ message: 'password is mandatory' })
  password: string;
}
