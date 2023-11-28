import {Injectable} from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HTTP_INTERCEPTORS,
    HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {StorageService} from '../_services/storage.service';
import {EventBusService} from '../_shared/event-bus.service';
import {EventData} from '../_shared/event.class';
import {Router} from "@angular/router";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    private isRefreshing = false;

    constructor(private storageService: StorageService,
                private eventBusService: EventBusService,
                private router: Router) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (req.url.includes('localhost')) {
        //     if (req.url.includes('localhost:8000')) {
        //         // Replace the server URL with the current browser URL host
        //         req = req.clone(
        //             {
        //                 url: req.url.replace('localhost:8000', window.location.host)
        //             }
        //         )
        //     }
        // }

        if (this.storageService.isLoggedIn()) {
            req = req.clone({
                withCredentials: true,
                setHeaders: {
                    'Authorization': `Bearer ${this.storageService.getToken()}`,
                }
            });
        }

        return next.handle(req).pipe(
            catchError((error) => {
                // logout when token is expired
                if (
                    error instanceof HttpErrorResponse &&
                    !req.url.includes('auth/signin') &&
                    error.status === 401
                ) {
                    return this.handle401Error(req, next);
                }
                return throwError(() => error);
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        this.storageService.clean();
        this.router.navigate(['/login']);
        return throwError(() => {
            return {
                error: {
                    message: 'You are not logged in'
                }
            };
        });
    }
}

export const httpInterceptorProviders = [
    {provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true},
];
