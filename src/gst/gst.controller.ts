import { AuthGuard } from '@nestjs/passport';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { GstService } from './gst.service';
import { CreateGstDto } from './dto/create-gst.dto';
import { UpdateGstDto } from './dto/update-gst.dto';
import { CurrentUser } from 'src/shared/decorators/user.decorator';

@Controller('gst')
export class GstController {
  constructor(private readonly gstService: GstService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createGstDto: CreateGstDto) {
    return this.gstService.create(createGstDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.gstService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('captcha')
  async getCaptcha(@CurrentUser() user: any) {
    const gstCaptcha = await this.gstService.getCaptcha();
    return {
      image:
        `/${user._id}/` +
        Buffer.from(gstCaptcha.image, 'binary').toString('base64'),
      idToken: gstCaptcha.captchaCookie,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gstService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGstDto: UpdateGstDto) {
    return this.gstService.update(id, updateGstDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gstService.remove(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('pan')
  createGst(
    @CurrentUser() user: any,
    @Body('pan') pan: string,
    @Body('idToken') idToken: string,
    @Body('captcha') captcha: string,
    @Body('incorporation_number') incorporation_number: string,
  ) {
    return this.gstService.createGstWithPan(
      user,
      pan,
      idToken,
      captcha,
      incorporation_number,
    );
  }
}
