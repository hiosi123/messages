import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from './tags/tags.module';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PaginationModule } from './common/pagination/pagination.module';
import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import environmentValidation from './config/environment.validation';
import jwtConfig from './auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { AuthenticationGuard } from './auth/guards/authentication/authentication.guard';

const ENV = process.env.NODE_ENV;

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            // envFilePath: ['.env.development']
            envFilePath: !ENV ? '.env' : `.env.${ENV}`,
            load: [appConfig, databaseConfig],
            validationSchema: environmentValidation
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                // entities: [User],
                autoLoadEntities: configService.get('database.autoLoadEntities'),
                synchronize: configService.get('database.synchronize'),
                port: configService.get<number>('database.port'),
                username: configService.get<string>('database.username'),
                password: configService.get<string>('database.password'),
                host: configService.get<string>('database.host'),
                database: configService.get<string>('database.name')
            })
        }),
        UsersModule,
        PostsModule,
        AuthModule,
        TagsModule,
        MetaOptionsModule,
        PaginationModule,
        ConfigModule.forFeature(jwtConfig),
        JwtModule.registerAsync(jwtConfig.asProvider())
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                whitelist: true, // only validation in entity will go through
                forbidNonWhitelisted: true,
                transform: true, // incomming dto will be instance of dto,
                transformOptions: {
                    enableImplicitConversion: true
                }
            })
        },
        {
            provide: APP_GUARD,
            useClass: AuthenticationGuard
        },
        AccessTokenGuard
    ]
})
export class AppModule {}
