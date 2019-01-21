import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleNotificationsComponent } from './simple-notifications/simple-notifications.component';
import { NotificationComponent } from './notification/notification.component';
import { MaxPipe } from './max.pipe';
import { NotificationsService } from './notifications.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SimpleNotificationsComponent,
    NotificationComponent,
    MaxPipe
  ],
  providers: [
    NotificationsService
  ],
  exports: [
    SimpleNotificationsComponent
  ]
})
export class NotificationsModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: NotificationsModule,
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: NotificationsModule) {
    if (parentModule) {
      throw new Error(
        'NotificationsModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
