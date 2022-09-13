import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { Expose } from "class-transformer";

export class DrawCardDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @Expose()
    numberDraw: number;
}
