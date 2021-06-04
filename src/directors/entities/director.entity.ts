import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Director {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  incorporation_number: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  din: string;

  @Prop({
    type: MongooseSchema.Types.Date,
    required: true,
  })
  date_of_approval: Date;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  name: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  status: string;
}
