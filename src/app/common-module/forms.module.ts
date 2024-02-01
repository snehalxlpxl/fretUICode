import { NgModule } from '@angular/core';

// import { FormRepeaterModule } from 'app/main/forms/form-repeater/form-repeater.module';
import { FormElementsModule } from 'app/common-module/form-elements.module';
import { DatatablesModule } from 'app/cargo/datatables.module';
// import { FormLayoutModule } from 'app/main/forms/form-layout/form-layout.module';
// import { FormValidationModule } from 'app/main/forms/form-validation/form-validation.module';
// import { FormWizardModule } from 'app/main/forms/form-wizard/form-wizard.module';


@NgModule({
  declarations: [],
  imports: [FormElementsModule,DatatablesModule]
})
export class FormsModule {}
