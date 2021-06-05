import { User } from './../../users/entities/user.entity';
import { Company } from './../../companies/entities/company.entity';
import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class Affiliate {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Company.name,
    required: true,
  })
  company_id: Company | string;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user_id: User | string;
}
