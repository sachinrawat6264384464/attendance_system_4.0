import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseFormat<T> {
  success: boolean;
  statusCode: number;
  message?: string;
  data: T;
  meta?: any;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResponseFormat<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseFormat<T>> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((result) => {
        // If response is already formatted or has meta
        if (result && typeof result === 'object' && 'data' in result && 'meta' in result) {
          return {
            success: true,
            statusCode,
            message: result.message ?? 'Success',
            data: result.data,
            meta: result.meta,
          };
        }

        return {
          success: true,
          statusCode,
          message: result?.message ?? 'Success',
          data: result?.data !== undefined ? result.data : result,
        };
      }),
    );
  }
}

