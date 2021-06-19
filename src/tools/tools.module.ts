import { GstModule } from './../gst/gst.module';
import { SharedModule } from 'src/shared/shared.module';
import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';

@Module({
  controllers: [ToolsController],
  providers: [ToolsService],
  imports: [SharedModule, GstModule],
})
export class ToolsModule {}
