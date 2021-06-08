import { Injectable } from '@nestjs/common';
import { CreateGstDto } from './dto/create-gst.dto';
import { UpdateGstDto } from './dto/update-gst.dto';

@Injectable()
export class GstService {
  create(createGstDto: CreateGstDto) {
    return 'This action adds a new gst';
  }

  findAll() {
    return `This action returns all gst`;
  }

  findOne(id: number) {
    return `This action returns a #${id} gst`;
  }

  update(id: number, updateGstDto: UpdateGstDto) {
    return `This action updates a #${id} gst`;
  }

  remove(id: number) {
    return `This action removes a #${id} gst`;
  }
}
