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
} from '@nestjs/common';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

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

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(+id, updateCompanyDto);
  }

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
}
