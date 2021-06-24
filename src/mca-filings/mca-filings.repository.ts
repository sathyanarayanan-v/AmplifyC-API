import { UpdateMcaFilingDto } from './dto/update-mca-filing.dto';
import { CreateMcaFilingDto } from './dto/create-mca-filing.dto';
import { McaFiling } from './entities/mca-filing.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { McaFilingDocument } from './mca-filings.schema';

@Injectable()
export class McaFilingRepository {
  constructor(
    @InjectModel(McaFiling.name)
    private mcaFilingModel: Model<McaFilingDocument>,
  ) {}

  create(mcaFilingDoc: CreateMcaFilingDto) {
    return new this.mcaFilingModel(mcaFilingDoc).save({
      validateBeforeSave: true,
    });
  }
  find(query?: any) {
    return this.mcaFilingModel.find(query ? query : {}).lean();
  }

  findOne(id: string) {
    return this.mcaFilingModel.findById(id).lean();
  }
  update(id: string, updateMcaFilingDto: UpdateMcaFilingDto) {
    return this.mcaFilingModel.findByIdAndUpdate(id, updateMcaFilingDto).lean();
  }
  remove(id: string) {
    return this.mcaFilingModel.findByIdAndDelete(id);
  }
}
