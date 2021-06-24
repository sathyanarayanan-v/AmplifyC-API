import { UpdateCompanyDto } from './dto/update-company.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyDocument } from './companies.schema';
import { Model } from 'mongoose';

@Injectable()
export class CompaniesRepository {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<CompanyDocument>,
  ) {}

  create(createCompanyDto: CreateCompanyDto) {
    return new this.companyModel(createCompanyDto).save({
      validateBeforeSave: true,
      timestamps: true,
    });
  }

  update(
    id: string,
    updateCompanyDto: UpdateCompanyDto,
    incorporation_number?: string,
  ) {
    if (incorporation_number) {
      return this.companyModel
        .findOneAndUpdate({ incorporation_number }, updateCompanyDto, {
          new: true,
        })
        .lean();
    }
    return this.companyModel.findByIdAndUpdate(id, updateCompanyDto, {
      new: true,
    });
  }

  findCompanyByCin(incorporation_number: string) {
    return this.companyModel.findOne({ incorporation_number }).lean();
  }

  findOne(id) {
    return this.companyModel.findById(id).lean();
  }
}
