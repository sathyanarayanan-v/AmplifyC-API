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
    type: MongooseSchema.Types.String,
    required: false,
  })
  date_of_incorporation?: string;

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
  total_contribution: number;

  @Prop({
    type: MongooseSchema.Types.Number,
    required: false,
  })
  paid_capital?: number;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  number_of_members?: String;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  activity_description?: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  registered_office_address?: string;

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
    type: MongooseSchema.Types.String,
    required: false,
  })
  listed?: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  date_of_agm?: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  date_of_bs?: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  filing_status?: string;

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

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  number_of_designated_partners: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  previous_desc: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  division_code: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  desc_main_division: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  date_of_statement_of_accounts_filed: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  date_of_annual_return_filed: string;

  @Prop({
    type: MongooseSchema.Types.String,
    required: false,
  })
  status: string;
}
