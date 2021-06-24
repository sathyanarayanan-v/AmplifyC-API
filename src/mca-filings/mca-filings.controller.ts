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
import { McaFilingsService } from './mca-filings.service';
import { CreateMcaFilingDto } from './dto/create-mca-filing.dto';
import { UpdateMcaFilingDto } from './dto/update-mca-filing.dto';

@Controller('mca-filings')
export class McaFilingsController {
  constructor(private readonly mcaFilingsService: McaFilingsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createMcaFilingDto: CreateMcaFilingDto) {
    return this.mcaFilingsService.create(createMcaFilingDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.mcaFilingsService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mcaFilingsService.findOne(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMcaFilingDto: UpdateMcaFilingDto,
  ) {
    return this.mcaFilingsService.update(id, updateMcaFilingDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mcaFilingsService.remove(id);
  }
}
