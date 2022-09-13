import { Test } from "@nestjs/testing";
import * as request from "supertest";
import { INestApplication } from "@nestjs/common";
import { DeckService } from "../index.service";
import { DeckModule } from "../index.module";
import { Deck, DeckType } from "../index.entity";
import { omit } from "lodash";
import { faker } from "@faker-js/faker";
import { generateCardsDeck } from "../../../helpers/deck";

describe("DeckController", () => {
    let app: INestApplication;
    let deckService: DeckService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [DeckModule],
            providers: [DeckService],
            exports: [DeckService],
        }).compile();

        app = moduleRef.createNestApplication();
        deckService = moduleRef.get<DeckService>(DeckService);

        await app.init();
    });

    describe("/POST /decks", () => {
        const url = "/";
        const requestBody = {
            type: DeckType.FULL,
            shuffled: true,
        };

        it("should return 201 and return deck info", async () => {
            const expectedResponse = {
                type: DeckType.FULL,
                shuffled: true,
                id: expect.any(String),
                remaning: null,
                cards: [],
            };

            return request(app.getHttpServer())
                .post(url)
                .send(requestBody)
                .expect("Content-Type", /json/)
                .expect(201)
                .expect((res) => {
                    expect(res.body).toEqual(expectedResponse);
                });
        });

        it("should return 422 when body request is missing type", async () => {
            const wrongRequestBody = { ...omit(requestBody, "type") };

            return request(app.getHttpServer())
                .post(url)
                .send(wrongRequestBody)
                .expect("Content-Type", /json/)
                .expect(422);
        });
    });

    describe("/POST /decks/open/:deckId", () => {
        it("should return 200 and return short deck info", async () => {
            const DUMMY_DECK_SHORT_SHUFFLED = {
                type: DeckType.SHORT,
                shuffled: true,
                id: faker.datatype.uuid(),
                remaning: null,
                cards: [],
                createdAt: faker.date.recent(),
                updatedAt: faker.date.recent(),
            };
            await deckService.create(DUMMY_DECK_SHORT_SHUFFLED);

            const url = `/open/${DUMMY_DECK_SHORT_SHUFFLED.id}`;
            const requestBody = {};

            const expectedResponse = {
                type: DeckType.SHORT,
                shuffled: true,
                id: expect.any(String),
                remaning: 32,
                cards: expect.length === 32,
            };

            return request(app.getHttpServer())
                .post(url)
                .send(requestBody)
                .expect("Content-Type", /json/)
                .expect(200)
                .expect((res) => {
                    expect(res.body).toEqual(expectedResponse);
                });
        });

        it("should return 200 and return full deck info", async () => {
            const DUMMY_DECK_FULL = {
                type: DeckType.FULL,
                shuffled: true,
                id: faker.datatype.uuid(),
                remaning: null,
                cards: [],
            };

            await deckService.create(DUMMY_DECK_FULL);

            const url = `/open/${DUMMY_DECK_FULL.id}`;
            const requestBody = {};

            const expectedResponse = {
                type: DeckType.FULL,
                shuffled: true,
                id: expect.any(String),
                remaning: 52,
                cards: expect.length === 52,
            };

            return request(app.getHttpServer())
                .post(url)
                .send(requestBody)
                .expect("Content-Type", /json/)
                .expect(200)
                .expect((res) => {
                    expect(res.body).toEqual(expectedResponse);
                });
        });

        it("should return 200 and return shuffled deck info", async () => {
            const DUMMY_DECK_SHORT_SHUFFLED = {
                type: DeckType.SHORT,
                shuffled: true,
                id: faker.datatype.uuid(),
                remaning: null,
                cards: [],
            };

            await deckService.create(DUMMY_DECK_SHORT_SHUFFLED);

            const url = `/open/${DUMMY_DECK_SHORT_SHUFFLED.id}`;
            const requestBody = {};

            const expectedResponse = {
                type: DeckType.SHORT,
                shuffled: true,
                id: expect.any(String),
                remaning: 32,
                cards: expect.length === 32,
            };

            return request(app.getHttpServer())
                .post(url)
                .send(requestBody)
                .expect("Content-Type", /json/)
                .expect(200)
                .expect((res) => {
                    expect(res.body).toEqual(expectedResponse);
                });
        });
    });

    describe("/POST /decks/drawCard/:deckId", () => {
        it("should return 200 and return deck info", async () => {
            const DUMMY_DECK_SHORT = {
                type: DeckType.SHORT,
                shuffled: true,
                id: faker.datatype.uuid(),
                remaning: 32,
                cards: generateCardsDeck(DeckType.SHORT),
            };
            await deckService.create(DUMMY_DECK_SHORT);

            const url = `/drawCard/${DUMMY_DECK_SHORT.id}`;
            const requestBody = { numberDraw: 5 };
            const expectedResponse = {
                type: DeckType.SHORT,
                shuffled: true,
                id: expect.any(String),
                remaning: 32 - 5,
                cards: expect.length === 32 - 5,
            };
            return request(app.getHttpServer())
                .post(url)
                .send(requestBody)
                .expect("Content-Type", /json/)
                .expect(201)
                .expect((res) => {
                    expect(res.body).toEqual(expectedResponse);
                    expect(res.body.cards[0].code).not.toEqual("AS");
                    expect(res.body.cards[1].code).not.toEqual("2S");
                    expect(res.body.cards[2].code).not.toEqual("3S");
                    expect(res.body.cards[3].code).not.toEqual("4S");
                    expect(res.body.cards[4].code).not.toEqual("5S");
                });
        });

        it("should return 422 when Insufficient remaining card", async () => {
            const DUMMY_DECK_SHORT = {
                type: DeckType.SHORT,
                shuffled: true,
                id: faker.datatype.uuid(),
                remaning: 1,
                cards: [
                    {
                        value: "9",
                        suit: "DIAMONDS",
                        code: "9D",
                    },
                ],
            };
            await deckService.create(DUMMY_DECK_SHORT);
            const url = `/drawCard/${DUMMY_DECK_SHORT.id}`;
            const requestBody = { numberDraw: 5 };
            return request(app.getHttpServer())
                .post(url)
                .send(requestBody)
                .expect("Content-Type", /json/)
                .expect(422);
        });
    });

    afterAll(async () => {
        await app.close();
    });
});
