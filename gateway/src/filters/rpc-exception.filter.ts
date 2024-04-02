import {Catch, ArgumentsHost, ExceptionFilter, HttpStatus} from '@nestjs/common';
import { RpcException } from "@nestjs/microservices";

// @Catch(RpcException)
// export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
//   catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
//     return throwError(() => exception.getError());
//   }
// }
@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const error = exception.getError();
    // @ts-ignore
    const status = error.status ?? HttpStatus.INTERNAL_SERVER_ERROR;
    // @ts-ignore
    const message = error.message ?? 'Internal server error';

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      message,
    });
  }
}