import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable()
export class UploadService {
  
    headers: HttpHeaders
    withCredentials: boolean
    fileName: string
    defaultBody: any
    
    constructor(
        private http: HttpClient,
    ) {
    }

    upload(path: string, file: File): Observable<any> {
        const req: HttpRequest<{}> = new HttpRequest('POST', path, file, {
            headers: this.headers,
            reportProgress: true,
            withCredentials: this.withCredentials,
        })
        return this.http.request(req)
    }
    
    setHeader(headers: any = {}): UploadService {
        this.headers = new HttpHeaders(headers)
        return this
    }
    
    setCredentials(withCredentials: boolean): UploadService {
        this.withCredentials = withCredentials
        return this
    }
    
    setFileName(name: string): UploadService {
        this.fileName = name
        return this
    }
    
    addExtraData(data: any = {}): UploadService {
        this.defaultBody = data
        return this
    }
  
}