import { IsEmail, IsNumberString, Length } from 'class-validator';

export class VerifyForgotPasswordDto {
  @IsEmail()
  email: string;

  @IsNumberString({ no_symbols: true })
  @Length(6, 6, { always: true, message: 'Invalid code provided' })
  code: string;
}
