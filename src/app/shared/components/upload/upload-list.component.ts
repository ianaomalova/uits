import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CommonFile, ListType } from './upload.interface'

const imageTypeList = ['webp', 'svg', 'png', 'gif', 'jpg', 'jpeg', 'jfif', 'bmp', 'dpg']

@Component({
  selector: 'upload-list',
  templateUrl: 'upload-list.component.html'
})
export class UploadListComponent {
  
    @Input() files: CommonFile[] = []
    @Input() disabled: boolean = false
    @Input('list-type') listType: ListType
    @Output() remove: EventEmitter<CommonFile> = new EventEmitter<CommonFile>()
    @Output() preview: EventEmitter<CommonFile> = new EventEmitter<CommonFile>()

    private extname(type: string): string {
        const temp = type.split('/');
        const imgType = temp[temp.length - 1];
        return imgType
    }
    
    removeHandle(file: CommonFile): void {
        this.remove.emit(file)
    }
    
    previewHandle(file: CommonFile): void {
        this.preview.emit(file)
    }

    isImageUrl(file: CommonFile): boolean {
        const url: string = (file.url || '') as string;
        if (!url) {
            return false;
        }
        if(file.raw) {
            const imageType = this.extname(file.raw.type)
            return imageTypeList.indexOf(imageType) > -1
        }
        return true;
      }
}