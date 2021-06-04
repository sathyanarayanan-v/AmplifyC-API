import { PatAuthGuard } from './../shared/guards/auth.guard';
import { ValidationPipe } from './../shared/pipes/validator.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  Put,
} from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { CreateDirectorDto } from './dto/create-director.dto';
import { UpdateDirectorDto } from './dto/update-director.dto';

@Controller('directors')
export class DirectorsController {
  constructor(private readonly directorsService: DirectorsService) {}

  @UseGuards(PatAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createDirectorDto: CreateDirectorDto) {
    return this.directorsService.create(
      createDirectorDto.incorporation_number,
      createDirectorDto,
    );
  }

  @Get()
  findAll() {
    return this.directorsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directorsService.findOne(id);
  }

  @UseGuards(PatAuthGuard)
  @UsePipes(new ValidationPipe())
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDirectorDto: UpdateDirectorDto,
  ) {
    return this.directorsService.update(id, updateDirectorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directorsService.remove(+id);
  }

  @UseGuards(PatAuthGuard)
  @UsePipes(new ValidationPipe())
  @Put('master-data')
  updateDirectorMasterData(@Body() updateDirectorDto: UpdateDirectorDto) {
    return this.directorsService.updateDirectorMasterData(updateDirectorDto);
  }
}
