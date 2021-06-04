import { SystemsModule } from './../systems/systems.module';
import { DirectorSchema } from './directors.schema';
import { Director } from './entities/director.entity';
import { DirectorRepository } from './directors.repository';
import { Module } from '@nestjs/common';
import { DirectorsService } from './directors.service';
import { DirectorsController } from './directors.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [DirectorsController],
  providers: [DirectorsService, DirectorRepository],
  imports: [
    MongooseModule.forFeature([
      { name: Director.name, schema: DirectorSchema },
    ]),
    SystemsModule,
  ],
})
export class DirectorsModule {}
