import { UpdateDirectorDto } from './dto/update-director.dto';
import { CreateDirectorDto } from './dto/create-director.dto';
import { Director } from './entities/director.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DirectorDocument } from './directors.schema';

@Injectable()
export class DirectorRepository {
  constructor(
    @InjectModel(Director.name) private directorModel: Model<DirectorDocument>,
  ) {}

  findOne(id: string) {
    return this.directorModel.findById(id).lean();
  }
  save(createDirectorDto: Partial<DirectorDocument>) {
    return new this.directorModel(createDirectorDto).save({
      validateBeforeSave: true,
    });
  }

  update(id: string, updateDirectorDto: Partial<DirectorDocument>) {
    return this.directorModel
      .findByIdAndUpdate(id, updateDirectorDto, { new: true })
      .lean();
  }

  findByDin(din: string) {
    return this.directorModel.findOne({ din }).lean();
  }

  findByDinAndCin(din: string, incorporation_number: string) {
    return this.directorModel.findOne({ din, incorporation_number }).lean();
  }
}
