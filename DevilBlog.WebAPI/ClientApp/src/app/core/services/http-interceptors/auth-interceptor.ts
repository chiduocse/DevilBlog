import { Injectable, Injector, PLATFORM_ID, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private inj: Injector,
        @Inject(PLATFORM_ID) private platformId
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Get the auth token from the service.
        const auth = this.inj.get(AuthService);
        // Clone the request and set the new header in one step.
        let headers = req.headers;
        if (isPlatformBrowser(this.platformId)) {
            headers = req.headers.set('Authorization', 'Bearer ' + auth.accessToken);
        }
        const authReq = req.clone({ headers });
       // Pass on the cloned request instead of the original request.
        return next.handle(authReq);
    }
}
