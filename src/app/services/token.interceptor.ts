import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, catchError, finalize, map, of } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // next bir sonraki middleware süreç aktarılır.

    console.log('interceptor', request);

    localStorage.setItem('token', 'xzcsefdwd');

    const req = request.clone({
      headers: request.headers.set(
        'Authorization',
        `Bearer ${localStorage.getItem('token') as string}`
      ),
    });

    console.log('loading true');

    return next.handle(req).pipe(
      map((event) => {
        console.log('event1', event);

        if (event instanceof HttpRequest) {
          console.log('req');
        } else if (event instanceof HttpResponse) {
          event = event.clone<any>({ body: event.body });
          console.log('response', event);
        }
        return event;
      }),
      catchError((err: any) => {
        const myError = { err };
        return of<any>(myError);
      }),
      finalize(() => {
        console.log('loading false');
      })
    );
  }
}
