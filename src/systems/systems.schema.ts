import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { System } from './entities/system.entity';

export type SystemDocument = Document & System;

export const SystemSchema = SchemaFactory.createForClass(System);
