import {
    Component, 
    ContentChild,
    ElementRef, 
    OnInit, 
    TemplateRef,
    ViewChild, 
    EventEmitter, 
    Input, 
    Output, 
    ChangeDetectionStrategy,
    ChangeDetectorRef
  } from '@angular/core'
  import { DomSanitizer, SafeUrl } from '@angular/platform-browser'
  import { HttpResponse } from '@angular/common/http'
  import { UploadService } from './upload.service'
  import { UploadFile, Lifecycle, CommonFile, UploadResponse, ListType } from './upload.interface'
  
  @Component({
    selector: 'upload',
    templateUrl: 'upload.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
  })
  export class UploadComponent implements OnInit {

    @Input() disabled: boolean = false
    @Input() data: any = {}
    @Input() name: string = 'file'
    @Input() action: string
    @Input() accept: string
    @Input() drag: boolean = false
    @Input() multiple: boolean = false
    @Input() headers?: any = {}
    @Input() avatar: boolean = false
    @Input() imageUrl: SafeUrl
    
    @Input() withCredentials: boolean = false
    @Input() showFileList: boolean = true
    @Input() listType: ListType = 'text'
    @Input() fileList: UploadFile[] = []

    @Output() preview: EventEmitter<CommonFile> = new EventEmitter<CommonFile>()
    @Output() remove: EventEmitter<CommonFile> = new EventEmitter<CommonFile>()
    @Output() progress: EventEmitter<UploadResponse<any>> = new EventEmitter<UploadResponse<any>>()

    @Output() success: EventEmitter<UploadResponse<any>> = new EventEmitter<UploadResponse<any>>()
    @Output() error: EventEmitter<UploadResponse<any>> = new EventEmitter<UploadResponse<any>>()
    
    @Input() uploadInterceptor: (f: File) => boolean = f => true
    
    protected get lifecycle(): Lifecycle {
        return {
            preview: (f: CommonFile) => this.preview.emit(f),
            remove: (f: CommonFile) => this.remove.emit(f),
            success: (f: CommonFile, res: HttpResponse<any>) => this.success.emit({ commonFile: f, response: res }),
            error: (f: CommonFile, err: any) => this.error.emit({ commonFile: f, error: err }),
            progress: (f: CommonFile, percentage: number) => this.progress.emit({ commonFile: f, percentage }),
        }
    }
    
    @ContentChild('trigger') trigger: TemplateRef<any>
    @ContentChild('dragger') dragger: TemplateRef<any>
    @ViewChild('input') input: ElementRef
    
    files: CommonFile[] = []
    
    static generateID(): string {
      return Math.random().toString(16).substr(2, 8)
    }
    static updatePercentage(response: any): number {
        const { loaded, total } = response
        if (loaded === undefined || !total) return 0
        return Math.round(loaded / total * 100)
    }
    
    constructor(
        private uploadSvc: UploadService,
        private sanitizer: DomSanitizer,
        private cdr: ChangeDetectorRef
    ) {
    }
    
    clickHandle(): void {
        if (this.disabled) return
        this.input.nativeElement.click()
    }
    
    changeHandle(event: Event): void {
        const files: FileList = (<HTMLInputElement>event.target).files
        if (!files || !files.length) return
        const checkedFiles: File[] = this.multiple ? Array.from(files) : [files[0]]
        this.input.nativeElement.value = null
        checkedFiles.forEach((file: File) => {
            const next = {
                id: UploadComponent.generateID(),
                name: file.name,
                status: 'ready',
                size: file.size,
                percentage: 0,
                raw: file,
                url: this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file))
            }
            this.files.push(next)
            this.updateFile(next)
            this.uploadInterceptor(file) === false ? this.removeHandle(next) : this.upload(next)
        })
    }
    
    upload(file: CommonFile): void {
        file.status = 'uploading'
        this.updateFile(file)
        this.uploadSvc.upload(this.action, file.raw).subscribe((event: any) => {
            file.percentage = UploadComponent.updatePercentage(event)
            file.percentage && this.lifecycle.progress(file, file.percentage)
            if (event instanceof HttpResponse) {
                this.lifecycle.success(Object.assign(file, { status: 'success' }), event)
                console.log('this.lifecycle', this.lifecycle)
            }
            this.updateFile(file)
        }, err => {
            file.status = 'fail'
            this.lifecycle.error(file, err)
            this.removeHandle(file)
        })
    }
    
    removeHandle(file: CommonFile): void {
        this.lifecycle.remove(file)
        const index = this.files.findIndex(({ id }) => file.id === id)
        this.files.splice(index, 1)
    }
    
    updateFile(file: CommonFile): void {
        const index = this.files.findIndex(({ id }) => file.id === id)
        console.log('file', file)
        if (typeof index !== 'number') return
        this.files[index] = file
        this.cdr.detectChanges();
    }
    
    ngOnInit(): void {
        this.uploadSvc
            .setHeader(this.headers)
            .setCredentials(this.withCredentials)
            .setFileName(this.name)
            .addExtraData(this.data)
        this.fileList.forEach((file: UploadFile) => {
            this.files.push({
                id: UploadComponent.generateID(),
                name: file.name,
                status: 'success',
                raw: null, size: null,
                url: this.sanitizer.bypassSecurityTrustUrl(file.url),
            })
        })
    }
}