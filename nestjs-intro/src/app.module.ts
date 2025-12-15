import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_PIPE } from '@nestjs/core';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, PostsModule, AuthModule],
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
