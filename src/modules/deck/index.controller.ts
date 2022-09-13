import { Body, ClassSerializerInterceptor, Controller, HttpCode, Param, Post, UseInterceptors } from "@nestjs/common";
import { ApiOkResponse, ApiParam, ApiTags } from "@nestjs/swagger";
import { BaseController } from "../../shared/base.controller";
import { CreateDeckDto } from "./dto/create-deck.dto";
import { DrawCardResponseDto } from "./dto/draw-card-response.dto";
import { DrawCardDto } from "./dto/draw-card.dto";
import { Deck } from "./index.entity";
import { DeckService } from "./index.service";

@ApiTags("deck")
@Controller('decks')
export class DeckController extends BaseController {
    constructor(private readonly deckService: DeckService){
      super();
    }

    @UseInterceptors(ClassSerializerInterceptor)
    @Post('')
    @ApiOkResponse({ description: "Returns new deck", type: Deck })
    @HttpCode(201)  
    async create(@Body() deckData: CreateDeckDto): Promise<Deck> {
      return await this.deckService.create(deckData);
    }  

    @Post('open/:deckId')
    @ApiParam({ name: "deckId", type: String })
    @ApiOkResponse({ description: "Open deck", type: Deck })
    @HttpCode(200)  
    async open(@Param('deckId') deckId: string): Promise<Deck> {
      return await this.deckService.open(deckId);
    }

    @Post('drawCard/:deckId')
    @ApiOkResponse({ description: "draw card(s) of a given deck", type: DrawCardResponseDto })
    @HttpCode(200)
    async drawCard(
      @Param('deckId') deckId: string,
      @Body() drawCardDto: DrawCardDto
      ): Promise<DrawCardResponseDto> {
        const {numberDraw} = drawCardDto
        return await this.deckService.drawCards(deckId, numberDraw);
    }
}