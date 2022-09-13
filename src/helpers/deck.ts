import { DeckType } from "../modules/deck/index.entity";

const SUITS = ["SPADES", "DIAMONDS", "CLUBS", "HEARTS"];
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

const assignCode = (value: string, suit: string) => {
    return !isNaN(parseInt(value))
        ? value.concat(suit.charAt(0))
        : value.charAt(0).concat(suit.charAt(0));
};

export const generateCardsDeck = (deckType: DeckType) => {
    let cardsOnDeck = [];
    let VALUES_FILTER = [];

    const VALUES_SHORT_EXCLUDE = ["2", "3", "4", "5", "6"];
    if (deckType === DeckType.SHORT) {
        VALUES_FILTER = VALUES.filter(element => !VALUES_SHORT_EXCLUDE.includes(element))
    } else {
        VALUES_FILTER = VALUES
    }

    SUITS.forEach((suit) => {
        VALUES_FILTER.forEach((value) => {
            let card = { value: value, suit: suit, code: assignCode(value, suit) };
            cardsOnDeck.push(card);
        });
    });
    return cardsOnDeck;
};

export const shuffingDeck = (cardsDeck) => {

    for (let i = 0; i < 100; i++) {
        let index1: number = Math.floor(Math.random() * cardsDeck.length);
        let index2: number = Math.floor(Math.random() * cardsDeck.length);
        let prev = cardsDeck[index1];
        cardsDeck[index1] = cardsDeck[index2];
        cardsDeck[index2] = prev;
    }
    return cardsDeck;
};
