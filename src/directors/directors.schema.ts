import { Director } from './entities/director.entity';
import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

export type DirectorDocument = Document & Director;

export const DirectorSchema = SchemaFactory.createForClass(Director);
