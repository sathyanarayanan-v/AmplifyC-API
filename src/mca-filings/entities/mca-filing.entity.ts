import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true })
export class McaFiling {
  @Prop({
    required: true,
    type: MongooseSchema.Types.String,
  })
  incorporation_number: string;

  @Prop({
    required: false,
    type: MongooseSchema.Types.String,
  })
  dof: string;

  @Prop({
    required: false,
    type: MongooseSchema.Types.String,
  })
  form: string;

  @Prop({
    required: false,
    type: MongooseSchema.Types.String,
  })
  srn: string;

  @Prop({
    required: false,
    type: MongooseSchema.Types.String,
  })
  documentId: string;
}
