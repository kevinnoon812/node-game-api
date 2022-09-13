import { IsNotEmpty, IsString } from "class-validator";
import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
    BeforeUpdate,
    PrimaryGeneratedColumn,
} from "typeorm";
import { Exclude } from "class-transformer";

export enum DeckType {
    FULL = "FULL",
    SHORT = "SHORT",
}

export class Card {
    value: string;
    suit: string;
    code: string;
}

@Entity({ name: "decks" })
export class Deck {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @IsNotEmpty()
    @IsString()
    @Column({
        type: "enum",
        enum: DeckType,
        default: DeckType.SHORT,
    })
    type: DeckType;

    @Column({ default: true })
    shuffled: boolean;

    @Column({nullable: true})
    remaning: number;

    @Column('json', { default: []})
    cards: Array<Card> | [];

    @Exclude()
    @CreateDateColumn()
    createdAt: Date;

    @Exclude()
    @UpdateDateColumn()
    updatedAt: Date;

    @BeforeInsert()
    async CreateDate() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    async UpdateDate() {
        this.updatedAt = new Date();
    }
}
