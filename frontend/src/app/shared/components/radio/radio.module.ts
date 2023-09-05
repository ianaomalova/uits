import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RadioComponent } from './radio.component'

@NgModule({
    declarations: [RadioComponent],
    exports: [RadioComponent],
    imports: [CommonModule, FormsModule]
})
export class RadioModule {}