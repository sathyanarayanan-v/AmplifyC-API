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
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, CreateUserBySystemDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/shared/decorators/user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/companies')
  getCompaniesForUser(@Param('id') id: string, @CurrentUser() user: any) {
    if (user._id.toString() === id) {
      return this.usersService.findCompaniesForUser(id);
    }
    throw new ForbiddenException('Forbidden access');
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @UseGuards(AuthGuard('jwt'))
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
