import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnChanges,
  OnInit,
  Type,
  ViewContainerRef
} from '@angular/core';
import {
  FormInputComponent,
  FormButtonComponent,
  FormSelectComponent,
  FormRadioButtonComponent,
  FormCheckboxComponent
} from '../components';
import { Field, IFieldConfig } from '@app/models';

const components: { [type: string]: Type<Field> } = {
  button: FormButtonComponent,
  input: FormInputComponent,
  number: FormInputComponent,
  select: FormSelectComponent,
  radio: FormRadioButtonComponent,
  checkbox: FormCheckboxComponent,
  // file: FormFileComponent,
  password: FormInputComponent,
  email: FormInputComponent
  // date: FormDateComponent,
  // time: FormTimeComponent,
  // textarea: FormTextareaComponent,
  //
  // checkboxlist: FormCheckboxListComponent,
};

@Directive({
  selector: '[devilFormField]'
})
export class FormFieldDirective implements Field, OnChanges, OnInit {
  @Input() config: IFieldConfig;
  component: ComponentRef<Field>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnChanges() {
    if (this.component) {
      this.component.instance.config = this.config;
    }
  }

  ngOnInit() {
    if (!components[this.config.type]) {
      const supportedTypes = Object.keys(components).join(', ');
      throw new Error(
        `Trying to use an unsupported type (${
          this.config.type
        }). Supported types: ${supportedTypes}`
      );
    }
    const component = this.resolver.resolveComponentFactory<Field>(
      components[this.config.type]
    );
    this.component = this.container.createComponent(component);
    this.component.instance.config = this.config;
  }
}
