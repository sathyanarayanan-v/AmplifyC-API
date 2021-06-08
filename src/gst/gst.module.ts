import { SharedModule } from 'src/shared/shared.module';
import { GstSchema } from './gst.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { GstRepository } from './gst.repository';
import { Module } from '@nestjs/common';
import { GstService } from './gst.service';
import { GstController } from './gst.controller';
import { Gst } from './entities/gst.entity';

@Module({
  controllers: [GstController],
  providers: [GstService, GstRepository],
  exports: [GstService, GstRepository],
  imports: [
    MongooseModule.forFeature([
      {
        schema: GstSchema,
        name: Gst.name,
      },
    ]),
    SharedModule,
  ],
})
export class GstModule {}
