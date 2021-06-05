import { convertDateStringToDate } from 'src/utils';
import { loggerInstance } from 'src/logger';
import { System } from './../systems/entities/system.entity';
import { User } from './../users/entities/user.entity';
import { CompaniesRepository } from './companies.repository';
import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private companiesRepository: CompaniesRepository) {}
  async create(user: any, createCompanyDto: CreateCompanyDto) {
    try {
      const company = await this.companiesRepository.findCompanyByCin(
        createCompanyDto.incorporation_number,
      );
      loggerInstance.log(
        `Company ${company.company_name} already exists. Not creating a new record`,
      );
      if (company) return company;
    } catch (error) {
      loggerInstance.log(error, 'error');
    }
    if (user.pat) {
      createCompanyDto.createdByModel = System.name;
    } else {
      createCompanyDto.createdByModel = User.name;
    }
    createCompanyDto.created_by = user._id;
    return this.companiesRepository.create(createCompanyDto);
  }

  findAll() {
    return `This action returns all companies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} company`;
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }

  updateWithCin(
    incorporation_number: string,
    updateCompanyDto: UpdateCompanyDto | any,
  ) {
    const modifiedUpdateCompanyDto = {
      ...updateCompanyDto,
      listed: updateCompanyDto['listed'] === 'true',
    };
    if (updateCompanyDto.date_of_agm) {
      modifiedUpdateCompanyDto['date_of_agm'] = convertDateStringToDate(
        updateCompanyDto.date_of_agm,
        'DD/MM/YYYY',
      );
    }
    if (updateCompanyDto.date_of_bs) {
      modifiedUpdateCompanyDto['date_of_bs'] = convertDateStringToDate(
        updateCompanyDto.date_of_bs,
        'DD/MM/YYYY',
      );
    }
    return this.companiesRepository.update(
      null,
      modifiedUpdateCompanyDto,
      incorporation_number,
    );
  }

  findByCin(incorporation_number: string) {
    return this.companiesRepository.findCompanyByCin(incorporation_number);
  }
}
