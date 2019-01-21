import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '@app/shared';
import { TopicService } from './topic.service';
import { TopicComponent } from './topic.component';

const routes: Routes = [{ path: '', component: TopicComponent }];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [TopicComponent],
  providers: [TopicService]
})
export class TopicModule {}
