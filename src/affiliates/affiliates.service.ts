import { AffiliateReporsitory } from './affiliates.repository';
import { Injectable } from '@nestjs/common';
import { CreateAffiliateDto } from './dto/create-affiliate.dto';
import { UpdateAffiliateDto } from './dto/update-affiliate.dto';

@Injectable()
export class AffiliatesService {
  constructor(private affiliateRepository: AffiliateReporsitory) {}

  create(createAffiliateDto: CreateAffiliateDto) {
    return this.affiliateRepository.create(createAffiliateDto);
  }

  findAll(id: string) {
    return this.affiliateRepository.getCompaniesForAffiliate(id);
  }

  findOne(id: number) {
    return `This action returns a #${id} affiliate`;
  }

  update(id: number, updateAffiliateDto: UpdateAffiliateDto) {
    return `This action updates a #${id} affiliate`;
  }

  remove(id: number) {
    return `This action removes a #${id} affiliate`;
  }
}
