import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders,
  ErrorHandler
} from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// App level services
import { GlobalErrorHandler, DataService } from './services';
// import { NotificationsModule } from './notifications';

@NgModule({
  imports: [HttpClientModule,
    // NotificationsModule.forRoot()
  ],
  declarations: [],
  exports: [HttpClientModule]
})
export class CoreModule {
  // forRoot allows to override providers
  // https://angular.io/docs/ts/latest/guide/ngmodule.html#!#core-for-root
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        DataService,
        { provide: ErrorHandler, useClass: GlobalErrorHandler }
      ]
    };
  }
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
