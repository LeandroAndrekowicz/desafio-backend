import { HttpException, HttpStatus, InternalServerErrorException, Logger } from '@nestjs/common';
import { MethodEnum } from '../enums/methods.enum';

export function handleUnexpectedError(error: unknown, className: string, method: MethodEnum, genericMessage: string): never {
    const logger: Logger = new Logger(className);

    if (error instanceof HttpException) {
        throw error;
    }

    logger.error(
        `[${method}] - Erro inesperado`,
        error instanceof Error ? error.stack : JSON.stringify(error),
    );

    throw new InternalServerErrorException(genericMessage)
}
