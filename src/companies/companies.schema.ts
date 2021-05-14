import { Company } from './entities/company.entity';
import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

export type CompanyDocument = Document & Company;

export const CompanySchema = SchemaFactory.createForClass(Company);
