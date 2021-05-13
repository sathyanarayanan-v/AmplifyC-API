import { UpdateSystemDto } from './dto/update-system.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateSystemDto } from './dto/create-system.dto';
import { System } from './entities/system.entity';
import { SystemDocument } from './systems.schema';
import { Model } from 'mongoose';

@Injectable()
export class SystemRepository {
  constructor(
    @InjectModel(System.name) private systemModel: Model<SystemDocument>,
  ) {}
  create(system: CreateSystemDto) {
    return new this.systemModel(system).save({
      validateBeforeSave: true,
      timestamps: true,
    });
  }

  findOneWithUsername(username: string) {
    return this.systemModel.findOne({ username }).lean();
  }

  update(id: string, system: Partial<UpdateSystemDto>) {
    return this.systemModel.findByIdAndUpdate(id, system, { new: true }).lean();
  }
}
