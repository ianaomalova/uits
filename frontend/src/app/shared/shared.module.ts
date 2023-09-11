import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {TranslateModule} from '@ngx-translate/core';
import {CSRFInterceptor} from "@app/shared/interceptor/csrf.interceptor";

@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    TranslateModule
  ],
  imports: [],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CSRFInterceptor, multi: true}
  ]
})

export class SharedModule {
}
