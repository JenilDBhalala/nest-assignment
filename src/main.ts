import { ValidationPipe, INestApplication } from '@nestjs/common';
import { NestFactory} from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppExceptionFilter } from './core/filters/exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as morgan from 'morgan';
import helmet from 'helmet';
import * as basicAuth from 'express-basic-auth'

const baseUrl = '/api';

function configureSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Product Store')
    .setDescription('Product Store API description')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'JWT token',
        in: 'header',
      },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(baseUrl, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new AppExceptionFilter());

  app.use(morgan('dev'));
  app.use(helmet());

  //protection of Swagger-UI for visitors
  app.use(
    ['/api', '/api-json'],
    basicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  configureSwagger(app);

  //starting server
  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 3001);
  await app.listen(port);
}
bootstrap();
