import { CreateAffiliateDto } from './dto/create-affiliate.dto';
import { Affiliate } from './entities/affiliate.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AffiliateDocument } from './affiliates.schema';
import { Model } from 'mongoose';
@Injectable()
export class AffiliateReporsitory {
  constructor(
    @InjectModel(Affiliate.name)
    private affiliateModel: Model<AffiliateDocument>,
  ) {}

  create(newAffiliateDto: CreateAffiliateDto) {
    return new this.affiliateModel(newAffiliateDto).save({
      validateBeforeSave: true,
    });
  }

  findAffiliate(company_id: string, user_id: string) {
    return this.affiliateModel.findOne({ company_id, user_id }).lean();
  }

  getCompaniesForAffiliate(user_id: string) {
    return this.affiliateModel.find({ user_id }).lean();
  }
}
