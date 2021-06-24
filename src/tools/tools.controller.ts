import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { ToolsService } from './tools.service';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('mca/master-data')
  getMasterData(@Body('incorporation_number') incorporation_number: string) {
    return this.toolsService.getCompanyMasterData(incorporation_number);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('mca/filings')
  getMcaFilings(@Body('incorporation_number') incorporation_number: string) {
    return this.toolsService.getMcaFilings(incorporation_number);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('gst/searchtp/pan')
  searchTaxPayerByPan(
    @CurrentUser() user: any,
    @Body('pan') pan: string,
    @Body('idToken') idToken: string,
    @Body('captcha') captcha: string,
  ) {
    return this.toolsService.searchTaxPayerByPan(user, pan, idToken, captcha);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('gst/filings')
  getLatestGst(@CurrentUser() user: any, @Body('gstin') gst: string) {
    return this.toolsService.getGstFilings(user, gst);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('gst/details')
  getGstDetails(
    @CurrentUser() user: any,
    @Body('gstin') gstin: string,
    @Body('idToken') idToken: string,
    @Body('captcha') captcha: string,
  ) {
    return this.toolsService.getGstDetails(user, gstin, captcha, idToken);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('internal/logs')
  getLogs(@CurrentUser() user: any) {
    return this.toolsService.readLogFile(user);
  }
}
