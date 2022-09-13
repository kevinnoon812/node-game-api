import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Card } from "../index.entity";

export class DrawCardResponseDto {

    @ApiProperty()
    @Expose()
    cards: Card[];
}
