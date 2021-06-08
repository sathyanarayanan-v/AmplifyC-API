import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GstService } from './gst.service';
import { CreateGstDto } from './dto/create-gst.dto';
import { UpdateGstDto } from './dto/update-gst.dto';

@Controller('gst')
export class GstController {
  constructor(private readonly gstService: GstService) {}

  @Post()
  create(@Body() createGstDto: CreateGstDto) {
    return this.gstService.create(createGstDto);
  }

  @Get()
  findAll() {
    return this.gstService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gstService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGstDto: UpdateGstDto) {
    return this.gstService.update(+id, updateGstDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gstService.remove(+id);
  }
}
