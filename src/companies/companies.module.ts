import { SystemsService } from 'src/systems/systems.service';
import { Company } from './entities/company.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesRepository } from './companies.repository';
import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CompanySchema } from './companies.schema';
import { SystemsModule } from 'src/systems/systems.module';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, CompaniesRepository],
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    SystemsModule,
  ],
})
export class CompaniesModule {}
