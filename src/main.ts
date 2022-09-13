import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ConfigService } from '@nestjs/config';


declare const module: any;

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    app.enableCors();

    // Define swagger
    const options = new DocumentBuilder()
        .setTitle('API document')
        .setDescription('')
        .setVersion('1.0')
        .addTag('API version 1')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    // Define Validation pipe
    app.useGlobalPipes(new ValidationPipe());

    // Apply Http exception filter
    app.useGlobalFilters(new HttpExceptionFilter());

    // Get port from environment and run app
    await app.listen(4000);

    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => app.close());
    }

}

bootstrap();
