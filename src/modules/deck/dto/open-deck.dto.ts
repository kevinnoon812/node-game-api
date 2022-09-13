import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsUUID } from "class-validator";
import { Expose } from "class-transformer";

export class OpenDeckDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    @Expose()
    id: string;
}
