import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { LogoModule } from '@app/shared/components/logo/logo.module';
import { ErrorsRoutingModule } from './errors-routing.module';

import { Error1Component } from './error-1/error-1.component';
import { Error2Component } from './error-2/error-2.component';

@NgModule({
    declarations: [
        Error1Component,
        Error2Component
    ],
    imports: [ 
        ErrorsRoutingModule,
        SharedModule,
        LogoModule,
    ],
    exports: [],
    providers: [],
})
export class ErrorsModule {}