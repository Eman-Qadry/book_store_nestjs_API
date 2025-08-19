import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

      app.use(
    '/orders/webhook',
    bodyParser.raw({ type: 'application/json' }), // Use raw body for Stripe webhook
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
