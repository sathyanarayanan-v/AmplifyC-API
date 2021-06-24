import { McaFiling } from './../mca-filings/entities/mca-filing.entity';
import { DirectorsService } from './../directors/directors.service';
import { McaFilingsService } from './../mca-filings/mca-filings.service';
import { SharedService } from 'src/shared/shared.service';
import { loggerInstance } from 'src/logger';
import { System } from './../systems/entities/system.entity';
import { User } from './../users/entities/user.entity';
import { CompaniesRepository } from './companies.repository';
import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateDirectorDto } from 'src/directors/dto/create-director.dto';

@Injectable()
export class CompaniesService {
  constructor(
    private companiesRepository: CompaniesRepository,
    private sharedService: SharedService,
    private mcaFilingService: McaFilingsService,
    private directorService: DirectorsService,
  ) {}
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

  findOne(id: string) {
    return this.companiesRepository.findOne(id);
  }

  update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
    incorporation_number?: string,
  ) {
    return this.companiesRepository.update(
      id,
      updateCompanyDto,
      incorporation_number,
    );
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
    return this.companiesRepository.update(
      null,
      modifiedUpdateCompanyDto,
      incorporation_number,
    );
  }

  findByCin(incorporation_number: string) {
    return this.companiesRepository.findCompanyByCin(incorporation_number);
  }

  searchCompanyName(user: any, company_name: string) {
    return this.sharedService.checkCompanyName(company_name);
  }

  async storeMasterData(user: any, id: string) {
    const company = await this.companiesRepository.findOne(id);
    return this.saveMasterData(company.incorporation_number);
  }

  async storeMcaFilings(user: any, id: string) {
    const company = await this.companiesRepository.findOne(id);
    return this.saveFilings(company.incorporation_number);
  }

  private async saveMasterData(incorporation_number: string) {
    let masterData = null;
    try {
      masterData = await this.sharedService.getCompanyMasterData(
        incorporation_number,
      );
      await Promise.all(
        masterData.directors.map((director: CreateDirectorDto) =>
          this.directorService.create(incorporation_number, director),
        ),
      );
    } catch (error) {
      loggerInstance.log(
        incorporation_number + ' :: ' + error,
        'error',
        'MasterDataError',
      );
    }
    return this.update(null, masterData as any, incorporation_number);
  }

  private async saveFilings(incorporation_number: string) {
    try {
      const res: any = await this.sharedService.getMcaFilings(
        incorporation_number,
      );
      const filings = res.filings;
      await Promise.all(
        filings.map((filing: any) => {
          const _filing = {
            ...filing,
            incorporation_number: incorporation_number,
          };
          return this.mcaFilingService.create(_filing);
        }),
      );
    } catch (error) {
      loggerInstance.log(
        incorporation_number + ' :: ' + error,
        'error',
        'MCAFilingsError',
      );
    }
    return this.mcaFilingService.findAll({
      incorporation_number: incorporation_number,
    });
  }
}
