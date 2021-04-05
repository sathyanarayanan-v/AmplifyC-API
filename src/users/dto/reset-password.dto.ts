import { IsEmail, IsNotEmpty, IsNumberString, Length } from 'class-validator';
export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsNumberString({ no_symbols: true })
  @Length(6, 6, { message: 'Invalid code provided' })
  code: string;

  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsNotEmpty({ message: 'Confirm password is required' })
  confirmPassword: string;
}
