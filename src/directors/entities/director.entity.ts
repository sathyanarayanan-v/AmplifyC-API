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
  'din/pan': string;

  @Prop({
    type: MongooseSchema.Types.Date,
    required: false,
  })
  begin_date: Date;

  @Prop({
    type: MongooseSchema.Types.Date,
    required: false,
  })
  end_date: Date;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  name: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  status: string;
}
