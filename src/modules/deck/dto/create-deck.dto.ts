import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty } from "class-validator";
import { Expose } from "class-transformer";
import { DeckType } from "../index.entity";

export class CreateDeckDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(DeckType)
    @Expose()
    type: DeckType;

    @ApiProperty()
    @IsNotEmpty()
    @IsBoolean()
    @Expose()
    shuffled: boolean;
}
