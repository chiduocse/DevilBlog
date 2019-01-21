import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material/material.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faPlayCircle,
  faRocket,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook
} from '@fortawesome/free-solid-svg-icons';
import {
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube,
  faFacebook
} from '@fortawesome/free-brands-svg-icons';

library.add(
  faBars,
  faUserCircle,
  faPowerOff,
  faCog,
  faRocket,
  faPlayCircle,
  faGithub,
  faMediumM,
  faTwitter,
  faInstagram,
  faYoutube,
  faFacebook,
  faPlus,
  faEdit,
  faTrash,
  faTimes,
  faCaretUp,
  faCaretDown,
  faExclamationTriangle,
  faFilter,
  faTasks,
  faCheck,
  faSquare,
  faLanguage,
  faPaintBrush,
  faLightbulb,
  faWindowMaximize,
  faStream,
  faBook
);

import { CompareValidatorDirective } from './directives';
import {
  UploadAvatarComponent,
  TreeChecklistComponent,
  // Forms
  DevilFormComponent,
  FormFieldDirective,
  FormInputComponent,
  FormButtonComponent,
  FormSelectComponent,
  FormRadioButtonComponent,
  FormCheckboxComponent,
  FormFieldErrorComponent,
  FormsService,
  // DataTable
  DevilTableComponent,
  // Dialog
  DevilDialogComponent,
  DevilDialogService,
  DevilDialogStateService
} from './components';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    FontAwesomeModule
  ],
  entryComponents: [
    DevilFormComponent,
    FormInputComponent,
    FormButtonComponent,
    FormSelectComponent,
    FormRadioButtonComponent,
    FormCheckboxComponent,
    // DataTable
    DevilTableComponent,
    // Dialog
    DevilDialogComponent,
    // Tree
    TreeChecklistComponent
  ],
  declarations: [
    CompareValidatorDirective,
    // Directive
    FormFieldDirective,
    // Forms
    DevilFormComponent,
    FormInputComponent,
    FormButtonComponent,
    FormSelectComponent,
    FormRadioButtonComponent,
    FormFieldErrorComponent,
    FormCheckboxComponent,
    // DataTable
    DevilTableComponent,
    // Dialog
    DevilDialogComponent,
    // Upload Avatar
    UploadAvatarComponent,
    // Tree
    TreeChecklistComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    FontAwesomeModule,

    CompareValidatorDirective,
    UploadAvatarComponent,
    TreeChecklistComponent,
    // Forms
    DevilFormComponent,
    FormInputComponent,
    FormButtonComponent,
    FormSelectComponent,
    FormRadioButtonComponent,
    FormCheckboxComponent,
    FormFieldErrorComponent,
    // DataTable
    DevilTableComponent,
    // Dialog
    DevilDialogComponent
  ],
  providers: [FormsService, DevilDialogService, DevilDialogStateService]
})
export class SharedModule {}

export * from './components';
