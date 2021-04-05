import {
  BadRequestException,
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { LeanDocument } from 'mongoose';
import { SharedService } from 'src/shared/shared.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginRequestDto } from 'src/users/dto/login-request.dto';
import { UserDocument } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import * as moment from 'moment';
import { VerifyForgotPasswordDto } from 'src/users/dto/verify-forgotpassword.dto';
import { ResetPasswordDto } from 'src/users/dto/reset-password.dto';
@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private sharedService: SharedService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    try {
      if (!(await this.userService.userExists(createUserDto.email))) {
        return this.userService.create(createUserDto);
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
    throw new BadRequestException('Email address already exists');
  }

  async login(loginDto: LoginRequestDto) {
    const user = await this.userService.findOneByEmail(loginDto.username);

    if (user) {
      const { passwordHash } = this.sharedService.getPasswordHash(
        user.passwordSalt,
        loginDto.password,
      );
      if (user.passwordHash === passwordHash) {
        return { token: this.sharedService.signJWT(user) };
      }
      throw new BadRequestException('Invalid credentials');
    }
    throw new BadRequestException('Invalid credentials');
  }

  async sendForgotPasswordCode(email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user) {
      const {
        forgotPasswordCode,
        mailSent,
      } = await this.sendForgotPasswordMail(user);
      if (mailSent) {
        await this.userService.update(user._id, {
          fpCode: forgotPasswordCode,
          fpCodeExpiry: moment().add(15, 'minutes').unix().toString(),
        });
        return;
      }
      throw new HttpException(
        'Some error occured. Please try again later.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    throw new BadRequestException('Email address not found');
  }

  async verifyCode(forgotPasswordDto: VerifyForgotPasswordDto) {
    const user = await this.userService.findOneByEmail(forgotPasswordDto.email);
    if (user) {
      const currentTime = moment().unix().toString();
      if (+user.fpCodeExpiry < +currentTime) {
        throw new BadRequestException('Code expired. Please try again');
      }
      if (user.fpCode !== forgotPasswordDto.code) {
        throw new BadRequestException(
          'Invalid code provided. Please try again.',
        );
      }
      return 'Voila. Code verified. Please set your new password.';
    }
    throw new BadRequestException('Invalid email address. Please try again');
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const user = await this.userService.findOneByEmail(resetPasswordDto.email);
    const currentTime = moment().unix().toString();
    if (+user.fpCodeExpiry < +currentTime) {
      throw new BadRequestException('Code expired. Please try again');
    }
    if (user.fpCode !== resetPasswordDto.code) {
      throw new BadRequestException('Invalid code provided. Please try again.');
    }
    if (user) {
      const { salt, passwordHash } = this.sharedService.saltHashPassword(
        resetPasswordDto.password,
      );

      return this.userService.update(user._id, {
        passwordHash,
        passwordSalt: salt,
      });
    }
    throw new NotFoundException('User not found');
  }

  private async sendForgotPasswordMail(user: LeanDocument<UserDocument>) {
    const forgotPasswordCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString();
    const html =
      'Your verification code for AmplifyC is <b>' +
      forgotPasswordCode +
      '</b>. <br/><br/> This code will expire in 15 minutes.<br/><br/> This is an automatic generated email. Do not reply to this email.';
    const mailSent = await this.sharedService.sendMail(
      'svvsathyanarayanan@gmail.com',
      user.email,
      'Forgot Password mail from AmplifyC',
      'AmplifyC',
      html,
    );
    return { forgotPasswordCode, mailSent };
  }
}
