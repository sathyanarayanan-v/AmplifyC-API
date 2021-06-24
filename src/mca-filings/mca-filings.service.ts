import { McaFilingRepository } from './mca-filings.repository';
import { Injectable } from '@nestjs/common';
import { CreateMcaFilingDto } from './dto/create-mca-filing.dto';
import { UpdateMcaFilingDto } from './dto/update-mca-filing.dto';

@Injectable()
export class McaFilingsService {
  constructor(private mcaFilingRepository: McaFilingRepository) {}
  create(createMcaFilingDto: CreateMcaFilingDto) {
    return this.mcaFilingRepository.create(createMcaFilingDto);
  }

  findAll(query?: any) {
    return this.mcaFilingRepository.find(query);
  }

  findOne(id: string) {
    return this.mcaFilingRepository.findOne(id);
  }

  update(id: string, updateMcaFilingDto: UpdateMcaFilingDto) {
    return this.mcaFilingRepository.update(id, updateMcaFilingDto);
  }

  remove(id: string) {
    return this.mcaFilingRepository.remove(id);
  }
}
