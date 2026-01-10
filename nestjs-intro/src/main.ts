import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // swagger configuration
    const config = new DocumentBuilder()
        .setTitle('NestJs MasterClass - Blog app API')
        .setDescription('Use the base API URL as http://localhost:3000')
        .setTermsOfService('http://localhost:3000/terms-of-service')
        .setLicense('MIT License', 'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt')
        .addServer('http://localhost:3000') // 여기로 요청 보내기
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
