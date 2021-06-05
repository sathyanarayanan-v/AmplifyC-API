import { Affiliate } from './entities/affiliate.entity';
import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

export type AffiliateDocument = Document & Affiliate;
export const AffiliateSchema = SchemaFactory.createForClass(Affiliate);
AffiliateSchema.index({ user_id: 1, company_id: 1 }, { unique: true });
