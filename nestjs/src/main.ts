import { NestFactory } from "@nestjs/core"; // @nestjs/core
import { AppModule } from "./app.module";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    await app.listen(3000);
}

bootstrap();

//npx ts-node-dev src/main.ts

// npm install -g @nestjs/cli
// nest new messages
// nest generate module messages
// nest generate controller messages/messages --flat