import { CreateGstDto } from './dto/create-gst.dto';
import { Gst } from './entities/gst.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GstDocument } from './gst.schema';
import { UpdateGstDto } from './dto/update-gst.dto';

@Injectable()
export class GstRepository {
  constructor(@InjectModel(Gst.name) private gstModel: Model<GstDocument>) {}

  create(createGstDto: CreateGstDto) {
    return new this.gstModel(createGstDto).save({ validateBeforeSave: true });
  }

  update(id: string, updateGstDto: Partial<UpdateGstDto>) {
    return this.gstModel.findByIdAndUpdate(id, updateGstDto);
  }

  findAll() {
    return this.gstModel.find().lean();
  }

  find(query: any) {
    if (query) return this.gstModel.find(query).lean();
    return this.gstModel.find().lean();
  }

  findOne(id: string) {
    return this.gstModel.findById(id).lean();
  }

  remove(id: string) {
    return this.gstModel.findByIdAndRemove(id).lean();
  }
}
