import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class System {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  username: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  pat: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  patExpiry: string;

  @Prop({
    type: [MongooseSchema.Types.String],
    required: false,
  })
  usedTimes: Array<string>;
}
