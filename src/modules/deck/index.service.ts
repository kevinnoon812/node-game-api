import { Injectable, NotFoundException, UnprocessableEntityException } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Deck } from "./index.entity";
import { CreateDeckDto } from "./dto/create-deck.dto";
import { generateCardsDeck, shuffingDeck } from "../../helpers/deck";
import { DrawCardResponseDto } from "./dto/draw-card-response.dto";

@Injectable()
export class DeckService {
    constructor(
        @InjectRepository(Deck)
        private deckRepository: Repository<Deck>
    ) {}

    async create(deckCreateDto: CreateDeckDto): Promise<Deck> {
        const { type, shuffled } = deckCreateDto;

        const deck: Deck = new Deck();
        deck.type = type;
        deck.shuffled = shuffled;
        // deck.remaning = deck.type === "FULL" ? 52 : 32;

        return await this.deckRepository.save(deck);
    }

    async open(deckId: string): Promise<Deck> {
        const deck = await this.deckRepository.findOneOrFail(deckId);

        if (!deck) throw new NotFoundException("Not found deck!");

        let cards = generateCardsDeck(deck.type);

        if (deck.shuffled) {
            cards = shuffingDeck(cards);
        }

        const deckUpdate = {
            ...deck,
            remaning: cards.length,
            cards: cards
        };
        return await this.deckRepository.save(deckUpdate);
    }

    async drawCards(deckId: string, numberDraw: number): Promise<DrawCardResponseDto> {
        const deck = await this.deckRepository.findOneOrFail(deckId);

        if (!deck) throw new NotFoundException("Not found deck!");

        if (numberDraw < 1) throw new UnprocessableEntityException("At least one card to draw");

        if (deck.remaning < numberDraw) throw new UnprocessableEntityException("Insufficient remaining card");

        const cardsDraw = deck.cards.slice(0, numberDraw);
        const cardsRemaning = deck.cards.splice(numberDraw);

        try {
            const deckUpdate = {
                ...deck,
                remaning: cardsRemaning.length,
                cards: cardsRemaning
            };
            await this.deckRepository.save(deckUpdate);
            return {cards: cardsDraw};
        } catch (err) {
            throw err;
        }
    }
}
