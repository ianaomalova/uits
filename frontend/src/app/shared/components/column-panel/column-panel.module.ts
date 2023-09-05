import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColumnPanelComponent } from './column-panel.component';

@NgModule({
    declarations: [
        ColumnPanelComponent
    ],
    imports: [ CommonModule ],
    exports: [
        ColumnPanelComponent
    ],
    providers: [],
})
export class ColumnPanelModule {}