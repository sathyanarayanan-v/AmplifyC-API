import { ValidationPipe } from './../shared/pipes/validator.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { AffiliatesService } from './affiliates.service';
import { CreateAffiliateDto } from './dto/create-affiliate.dto';
import { UpdateAffiliateDto } from './dto/update-affiliate.dto';
import { IUser } from '../users/entities/user.entity';
@Controller('affiliates')
export class AffiliatesController {
  constructor(private readonly affiliatesService: AffiliatesService) {}

  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  @Post('')
  create(@Body() createAffiliateDto: CreateAffiliateDto) {
    return this.affiliatesService.create(createAffiliateDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(@CurrentUser() user: IUser) {
    return this.affiliatesService.findAll(user._id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.affiliatesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAffiliateDto: UpdateAffiliateDto,
  ) {
    return this.affiliatesService.update(+id, updateAffiliateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.affiliatesService.remove(+id);
  }
}
