import { Gst } from './entities/gst.entity';
import { Document } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';

export type GstDocument = Document & Gst;

export const GstSchema = SchemaFactory.createForClass(Gst);
