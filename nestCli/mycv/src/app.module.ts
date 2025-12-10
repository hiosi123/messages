import { MiddlewareConsumer, Module, ValidationPipe} from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import cookieSession from 'cookie-session';
import { TypeOrmConfigService } from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // do not have to re import from other module
      envFilePath: `.env.${process.env.NODE_ENV}`
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (config: ConfigService) => {
    //      return{
    //       type: 'sqlite',
    //       database: config.get<string>('DB_NAME'),
    //       synchronize: true,
    //       entities: [User, Report]
    //      }
    //   }
    // }), // check2
    // TypeOrmModule.forRoot({
    //   type: 'sqlite',
    //   database: process.env.NODE_ENV === 'test' ? 'test.sqlite' : 'db.sqlite',
    //   entities: [User, Report],
    //   synchronize: true, // automatically update the structure of the database
    // }),
    UsersModule, 
    ReportsModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, //Only the validated fields in emtity will be go throguh, for security concern
      })
    }
  ],
})

export class AppModule {
  constructor(
    private configService: ConfigService
  ){}

  configure(consumer: MiddlewareConsumer){
    consumer.apply(
      cookieSession({
        keys: [this.configService.get('COOKIE_KEY') || '']
      })
    ).forRoutes('*')
  }
}
