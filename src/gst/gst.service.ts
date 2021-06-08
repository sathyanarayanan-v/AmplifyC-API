import { GstRepository } from './gst.repository';
import { Injectable } from '@nestjs/common';
import { CreateGstDto } from './dto/create-gst.dto';
import { UpdateGstDto } from './dto/update-gst.dto';

@Injectable()
export class GstService {
  constructor(private gstRepository: GstRepository) {}
  create(createGstDto: CreateGstDto) {
    return this.gstRepository.create(createGstDto);
  }

  findAll() {
    return this.gstRepository.findAll();
  }

  findOne(id: string) {
    return this.gstRepository.findOne(id);
  }

  update(id: string, updateGstDto: UpdateGstDto) {
    return this.gstRepository.update(id, updateGstDto);
  }

  remove(id: string) {
    return this.gstRepository.remove(id);
  }
}
