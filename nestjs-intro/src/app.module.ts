import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: () => ({
        type: 'postgres',
        entities: [],
        synchronize: true,
        port: 5432,
        username: 'simon',
        password: 'root',
        host: 'localhost', 
        database: 'postgres',
      })
    }),
    UsersModule, 
    PostsModule, 
    AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true, // only validation in entity will go through
        forbidNonWhitelisted: true,
        transform: true, // incomming dto will be instance of dto
      })
    }
  ],
})
export class AppModule {}
