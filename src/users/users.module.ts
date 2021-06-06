import { CompaniesModule } from './../companies/companies.module';
import { CompaniesService } from './../companies/companies.service';
import { AffiliatesService } from './../affiliates/affiliates.service';
import { AffiliatesModule } from './../affiliates/affiliates.module';
import { SystemsModule } from 'src/systems/systems.module';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import { UserSchema } from './users.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
    ]),
    SharedModule,
    SystemsModule,
    AffiliatesModule,
    CompaniesModule,
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    AffiliatesService,
    CompaniesService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
