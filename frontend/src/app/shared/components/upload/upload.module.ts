import { NgModule, ModuleWithProviders } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { UploadService } from './upload.service';
import { UploadComponent } from './upload.component';
import { UploadListComponent } from './upload-list.component';
import { UploadDraggerComponent } from './upload-dragger.component';

@NgModule({
    declarations: [UploadComponent, UploadListComponent, UploadDraggerComponent],
    exports: [UploadComponent],
    imports: [
        CommonModule,
        FormsModule,
        HttpClientModule,
    ]
})
export class UploadModule {
    static forRoot(): ModuleWithProviders<UploadModule> {
        return { ngModule: UploadModule, providers: [UploadService] }
    }
}