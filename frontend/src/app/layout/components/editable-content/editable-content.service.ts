import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ApiConfig} from "@app/configs/api.config";
import {map, Observable} from 'rxjs';

interface EditableContent {
  id: number,
  text: string,
  page: string,
  created_at: Date,
  modified_at: Date,
}

@Injectable({
  providedIn: 'root'
})
export class EditableContentService {

  constructor(private http: HttpClient) {
  }

  public getPage(page: string): Observable<EditableContent> {
    return this.http.get<EditableContent>(ApiConfig.editableContentPage + encodeURIComponent(page)).pipe(
      this.mapEditableContent()
    )
  }

  public updatePage(page: string, body: Partial<EditableContent>): Observable<EditableContent> {
    return this.http.patch<EditableContent>(ApiConfig.editableContentPage + encodeURIComponent(page), body).pipe(
      this.mapEditableContent()
    );
  }


  private mapEditableContent() {
    return map<EditableContent, EditableContent>(page => {
      return {
        ...page,
        created_at: new Date(page.created_at),
        modified_at: new Date(page.modified_at),
      }
    })
  }
}
