import { Module } from "@nestjs/common";
import { DeckService } from "./index.service";
import { DeckController } from "./index.controller";
import { Deck } from "./index.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Deck])],
    providers: [DeckService],
    controllers: [DeckController],
})
export class DeckModule {}
