import { Injectable } from '@nestjs/common';
import { SharedService } from 'src/shared/shared.service';
import { CreateUserDto, NewUser } from './dto/create-user.dto';
import { UpdateUserDoc, UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private sharedService: SharedService,
  ) {}

  create(createUserDto: CreateUserDto) {
    const { salt, passwordHash } = this.sharedService.saltHashPassword(
      createUserDto.password,
    );
    const newUser: NewUser = {
      ...createUserDto,
      passwordHash,
      passwordSalt: salt,
    };
    return this.userRepository.create(newUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: Partial<UpdateUserDoc>) {
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  findWithEmailPassword(
    email: string,
    passwordHash: string,
    passwordSalt: string,
  ) {
    return this.userRepository.findWithEmailPassword(
      email,
      passwordHash,
      passwordSalt,
    );
  }

  userExists(email: string) {
    return this.userRepository.userExists(email);
  }

  findOneByEmail(email: string) {
    return this.userRepository.findOneByEmail(email);
  }
}
