import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  name: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: true,
  })
  username: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  passwordHash: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  passwordSalt: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  fpCode: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  fpCodeExpiry: string;
}
export class IUser extends User {
  _id: string;
}
