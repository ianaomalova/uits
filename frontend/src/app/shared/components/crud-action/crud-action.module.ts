import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CrudActionComponent} from '@app/shared/components/crud-action/crud-action.component';


@NgModule({
  declarations: [CrudActionComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CrudActionComponent
  ]
})
export class CrudActionModule {
}
