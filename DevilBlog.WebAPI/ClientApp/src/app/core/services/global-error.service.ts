import { ErrorHandler, Injectable, ApplicationRef, Injector } from '@angular/core';
import { NotificationsService } from '@app/core/notifications';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    constructor(
        private ns: NotificationsService,
        private inj: Injector
    ) { }

    handleError(errorResponse: any): void {
        if (errorResponse.status === 401) {
            this.ns.error('Unauthorised', 'Pleae login again.');
        } else if (errorResponse.status === 400) {
            console.log('***** HANDLE ERROR *****');
            this.ns.error(errorResponse.error.message,
                this.formatErrors(errorResponse.error.errors));
        } else {
            const error = (errorResponse && errorResponse.rejection) ? errorResponse.rejection.error : errorResponse;
            this.ns.error(error);
        }
        console.error(errorResponse);
        this.inj.get(ApplicationRef).tick();
    }

    private formatErrors(errors: any) {
        return errors ? errors.map((err: any) => err.message).join('/n ') : '';
    }

}
