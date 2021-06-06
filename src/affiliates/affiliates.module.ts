import { AffiliateReporsitory } from './affiliates.repository';
import { AffiliateSchema } from './affiliates.schema';
import { Affiliate } from './entities/affiliate.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AffiliatesService } from './affiliates.service';
import { AffiliatesController } from './affiliates.controller';

@Module({
  controllers: [AffiliatesController],
  providers: [AffiliatesService, AffiliateReporsitory],
  exports: [AffiliatesService, AffiliateReporsitory],
  imports: [
    MongooseModule.forFeature([
      {
        name: Affiliate.name,
        schema: AffiliateSchema,
      },
    ]),
  ],
})
export class AffiliatesModule {}
