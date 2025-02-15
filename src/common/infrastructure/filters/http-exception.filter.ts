import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CustomException } from 'src/common/domain/exceptions/custom.exception';
import { Response as CustomResponse } from 'src/common/domain/entities/response.entity';

@Catch(Error)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        if (exception instanceof CustomException) {
            return response.status(exception.statusCode).json(
                new CustomResponse(false, exception.statusCode, exception.message)
            );
        }

        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
            new CustomResponse(false, HttpStatus.INTERNAL_SERVER_ERROR, 'Internal Server Error')
        );
    }
}
