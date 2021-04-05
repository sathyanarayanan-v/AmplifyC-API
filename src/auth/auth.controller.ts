import { ValidationPipe } from './../shared/pipes/validator.pipe';
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginRequestDto } from 'src/users/dto/login-request.dto';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { VerifyForgotPasswordDto } from 'src/users/dto/verify-forgotpassword.dto';
import { ResetPasswordDto } from 'src/users/dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() loginDto: LoginRequestDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('principal')
  getCurrentUser(@CurrentUser() user: any) {
    return user;
  }

  @Post('forgot-password/send-mail')
  sendForgotPasswordEmail(@Query('email') email: string) {
    return this.authService.sendForgotPasswordCode(email);
  }

  @Post('forgot-password/verify-email')
  @UsePipes(new ValidationPipe())
  verifyForgotPasswordCode(@Body() forgotPasswordDto: VerifyForgotPasswordDto) {
    return this.authService.verifyCode(forgotPasswordDto);
  }

  @Post('forgot-password/reset-password')
  @UsePipes(new ValidationPipe())
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
