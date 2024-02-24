import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from './logo.component';
import {RouterLinkWithHref} from "@angular/router";

@NgModule({
    declarations: [
        LogoComponent
    ],
    imports: [CommonModule, RouterLinkWithHref],
    exports: [
        LogoComponent
    ]
})
export class LogoModule {}
