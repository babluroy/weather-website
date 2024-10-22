import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes(environment.WEATHER_API_URL)) {
      const clonedRequest = request.clone({
        params: request.params.set('key', environment.WEATHER_API_key)
      });
      return next.handle(clonedRequest);
    }
    return next.handle(request);
  }
}
