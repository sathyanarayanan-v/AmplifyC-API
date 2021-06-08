import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Gst {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  incorporation_number: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  gstin: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  legal_name: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  trade_name: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  date_of_reg: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  constitution_of_business: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  gstin_status: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  taxpayer_type: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  ppob: string;
}
