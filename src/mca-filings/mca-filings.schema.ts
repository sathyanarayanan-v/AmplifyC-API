import { McaFiling } from './entities/mca-filing.entity';
import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

export type McaFilingDocument = Document & McaFiling;

export const McaFilingSchema = SchemaFactory.createForClass(McaFiling);
