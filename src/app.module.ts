import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { DeckModule } from './modules/deck/index.module';
import { Deck } from './modules/deck/index.entity';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            expandVariables: true,
            envFilePath: `.env`,
            load: [configuration],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('DATABASE_CONFIG.HOST'),
                port: configService.get<number>('DATABASE_CONFIG.PORT'),
                username: configService.get<string>('DATABASE_CONFIG.USERNAME'),
                password: configService.get<string>('DATABASE_CONFIG.PASSWORD'),
                database: configService.get<string>('DATABASE_CONFIG.DATABASE'),
                entities: [
                    Deck
                ],
                synchronize: true,
            }),
            inject: [ConfigService],
        }),
        DeckModule
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {
}