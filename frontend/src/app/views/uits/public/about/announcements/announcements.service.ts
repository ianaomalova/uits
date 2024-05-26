import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {PostsBaseService} from "@app/views/uits/base/posts-base/posts-base.service";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService extends PostsBaseService{
  constructor(http: HttpClient) {
    super(http);
    this.type = 'ANNOUNCEMENTS'
  }
}
