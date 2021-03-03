import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.tokenStorageService.hasToken()) {
      let newHeaders = request.headers;
      newHeaders = newHeaders.set(
        'Authorization',
        'Bearer ' + this.tokenStorageService.getToken()
      );
      request = request.clone({ headers: newHeaders });
    }
    return next.handle(request);
  }
}
