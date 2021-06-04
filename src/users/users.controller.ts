import { ValidationPipe } from './../shared/pipes/validator.pipe';
import { PatAuthGuard } from './../shared/guards/auth.guard';
import { System } from './../systems/entities/system.entity';
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
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserBySystemDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/shared/decorators/user.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  // System Endpoint
  @Post('create')
  @UsePipes(new ValidationPipe())
  @UseGuards(PatAuthGuard)
  createUser(
    @CurrentUser() user: System,
    @Body() createUserBySystemDto: CreateUserBySystemDto,
  ) {
    return this.usersService.createUserBySystem(createUserBySystemDto);
  }
}
