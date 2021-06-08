import { SharedModule } from './shared/shared.module';
import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { HttpErrorFilter } from './shared/filters/http/http.filter';
import { HttpInterceptor } from './shared/interceptors/http/http.interceptor';
import { LoggerInterceptor } from './shared/interceptors/logger/logger.interceptor';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { SystemsModule } from './systems/systems.module';
import { CompaniesModule } from './companies/companies.module';
import { DirectorsModule } from './directors/directors.module';
import { AffiliatesModule } from './affiliates/affiliates.module';
import { GstModule } from './gst/gst.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, {
      // keepAlive: true,
      // keepAliveInitialDelay: 30000,
      useFindAndModify: false,
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      // user: process.env.DB_USER,
      // pass: process.env.DB_PASS,
    }),
    AuthModule,
    UsersModule,
    SharedModule,
    SystemsModule,
    CompaniesModule,
    DirectorsModule,
    AffiliatesModule,
    GstModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}
