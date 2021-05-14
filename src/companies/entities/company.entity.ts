import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Company {
  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  incorporation_number?: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  company_name: string;

  @Prop({
    type: MongooseSchema.Types.Date,
    required: false,
  })
  incorporation_date?: Date;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  state?: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  roc?: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  category?: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  sub_category?: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  class_of_company?: string;

  @Prop({
    type: MongooseSchema.Types.Number,
    required: false,
  })
  authorized_capital?: number;

  @Prop({
    type: MongooseSchema.Types.Number,
    required: false,
  })
  paid_capital?: number;

  @Prop({
    type: MongooseSchema.Types.Number,
    required: false,
  })
  number_of_members?: number;

  @Prop({
    type: MongooseSchema.Types.Number,
    required: false,
  })
  activity_desc?: number;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  reg_off_add?: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  registration_number?: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  email?: string;

  @Prop({
    type: MongooseSchema.Types.Boolean,
    required: false,
  })
  listed?: boolean;

  @Prop({
    type: MongooseSchema.Types.Date,
    required: false,
  })
  date_of_agm?: Date;

  @Prop({
    type: MongooseSchema.Types.Date,
    required: false,
  })
  date_of_bs?: Date;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  efiling_status?: string;

  @Prop({
    type: [MongooseSchema.Types.Mixed],
    required: false,
  })
  director_det?: Array<any>;

  @Prop({
    type: [MongooseSchema.Types.Mixed],
    required: false,
  })
  signatory_det?: Array<any>;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    refPath: 'createdByModel',
    required: true,
  })
  created_by: any;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  type?: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: true,
  })
  createdByModel: string;
}
