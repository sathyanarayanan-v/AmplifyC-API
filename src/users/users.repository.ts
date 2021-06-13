import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { UserDocument } from './users.schema';
import { CreateUserDto, NewUser } from './dto/create-user.dto';
import { UpdateUserDoc } from './dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  findAll() {
    return this.userModel.find().select(this.excludeFields).lean();
  }
  excludeFields = ['-passwordHash', '-passwordSalt'];
  create(user: NewUser) {
    return new this.userModel(user).save({
      validateBeforeSave: true,
      timestamps: true,
    });
  }

  findWithEmailPassword(
    email: string,
    passwordHash: string,
    passwordSalt: string,
  ) {
    return this.userModel.findOne({ email, passwordHash, passwordSalt }).lean();
  }

  userExists(email: string) {
    return this.userModel.exists({ email });
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).lean();
  }

  update(id: string, updateUserDoc: Partial<UpdateUserDoc>) {
    return this.userModel
      .findByIdAndUpdate(id, updateUserDoc, { new: true })
      .select(this.excludeFields)
      .lean();
  }
  findByUsername(username: string) {
    return this.userModel.findOne({ username }).lean();
  }
}
