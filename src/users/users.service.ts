import { CompaniesService } from './../companies/companies.service';
import { AffiliatesService } from './../affiliates/affiliates.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { loggerInstance } from 'src/logger';
import { SharedService } from 'src/shared/shared.service';
import {
  CreateUserDto,
  NewUser,
  CreateUserBySystemDto,
} from './dto/create-user.dto';
import { UpdateUserDoc } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UsersRepository,
    private sharedService: SharedService,
    private affiliateService: AffiliatesService,
    private companyService: CompaniesService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { salt, passwordHash } = this.sharedService.saltHashPassword(
      createUserDto.password,
    );
    const newUser: NewUser = {
      ...createUserDto,
      passwordHash,
      passwordSalt: salt,
    };
    const user = await this.userRepository.create(newUser);
    delete user.passwordHash;
    delete user.passwordSalt;
    return user;
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findCompaniesForUser(id: string) {
    const affiliatedCompanies = await this.affiliateService.findAll(id);
    return Promise.all(
      affiliatedCompanies.map((affiliate) =>
        this.companyService.findOne(affiliate.company_id as string),
      ),
    );
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

  async createUserBySystem(userDto: CreateUserBySystemDto) {
    const { username } = userDto;
    let characters = username.split('@')[0] + username.split('@')[1];
    const password = this.generatePassword(username.length, characters);

    try {
      // Todo: Enable this option on only production
      // const html = `Your credentials for amplifyc is <li>username: ${username}
      // <li>password: ${password}</li>`;
      // await this.sharedService.sendMail(
      //   'svvsathyanarayanan@gmail.com',
      //   username,
      //   'Welcome to AmplifyC',
      //   'AmplifyC',
      //   html,
      // );
      await this.create({ email: username, password, username });
      return;
    } catch (error) {
      loggerInstance.log(error, 'error');
      throw new InternalServerErrorException();
    }
  }

  private generatePassword(length: number, characters: string) {
    const result = [];
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result.push(
        characters.charAt(Math.floor(Math.random() * charactersLength)),
      );
    }
    return result.join('');
  }

  findUserByUsername(username: string) {
    return this.userRepository.findByUsername(username);
  }
}
