import { ValidationPipe } from './../shared/pipes/validator.pipe';
import { User } from './../users/entities/user.entity';
import { System } from './../systems/entities/system.entity';
import { PatAuthGuard } from './../shared/guards/auth.guard';
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
  Put,
} from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

interface IOverallComplianceResponse {
  gst: { status: 'warn' | 'alert' | 'compliant'; color: string };
  mca: { status: 'warn' | 'alert' | 'compliant'; color: string };
  itr: { status: 'warn' | 'alert' | 'compliant'; color: string };
  totalScore: string;
}
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @UseGuards(PatAuthGuard)
  @Post('create')
  create(
    @CurrentUser() user: System,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    return this.companiesService.create(user, createCompanyDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  creteCompany(
    @CurrentUser() user: User,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    return this.companiesService.create(user, createCompanyDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('name-search/:companyName')
  searchCompanyName(
    @CurrentUser() user: any,
    @Param('companyName') company_name: string,
  ) {
    return this.companiesService.searchCompanyName(user, company_name);
  }

  // System Endpoint
  @UseGuards(PatAuthGuard)
  @Put('update/:incorporation_number')
  updateCompany(
    @Param('incorporation_number') incorporation_number: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.updateWithCin(
      incorporation_number,
      updateCompanyDto,
    );
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/compliance/overall')
  getComplianceScore(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ): Promise<IOverallComplianceResponse> {
    return null;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/master-data')
  getMasterData(@CurrentUser() user: any, @Param('id') id: string) {
    return this.companiesService.storeMasterData(user, id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id/filings')
  getFilings(@CurrentUser() user: any, @Param('id') id: string) {
    return this.companiesService.storeMcaFilings(user, id);
  }
}
