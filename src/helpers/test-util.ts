import { Test, Response } from "supertest";

export const supertestIt = (description: string, test: () => Test | Promise<Response>): void => it(description, test);
supertestIt.only = (description: string, test: () => Test | Promise<Response>) => it.only(description, test);
supertestIt.skip = (description: string, test: () => Test | Promise<Response>) => it.skip(description, test);
