import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
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
}
