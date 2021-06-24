import { McaFilingRepository } from './mca-filings.repository';
import { McaFilingSchema } from './mca-filings.schema';
import { McaFiling } from './entities/mca-filing.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { McaFilingsService } from './mca-filings.service';
import { McaFilingsController } from './mca-filings.controller';

@Module({
  controllers: [McaFilingsController],
  providers: [McaFilingsService, McaFilingRepository],
  imports: [
    MongooseModule.forFeature([
      {
        name: McaFiling.name,
        schema: McaFilingSchema,
      },
    ]),
  ],
  exports: [McaFilingsService, McaFilingRepository],
})
export class McaFilingsModule {}
