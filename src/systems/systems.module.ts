import { SystemRepository } from './system.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { SystemsService } from './systems.service';
import { SystemsController } from './systems.controller';
import { System } from './entities/system.entity';
import { SystemSchema } from './systems.schema';
@Module({
  controllers: [SystemsController],
  providers: [SystemsService, SystemRepository],
  exports: [SystemsService, SystemRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: System.name,
        schema: SystemSchema,
      },
    ]),
  ],
})
export class SystemsModule {}
