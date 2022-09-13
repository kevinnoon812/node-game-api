import { UseInterceptors } from "@nestjs/common";
import { LoggingInterceptor } from "../interceptors/logger.interceptor";


@UseInterceptors(LoggingInterceptor)
export class BaseController {
    constructor() { }
}
