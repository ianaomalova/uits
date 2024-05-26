import {Injectable} from '@angular/core';
import {OnLimitOffsetPaginate, Pagination} from '@app/shared/types/paginate.interface';
import {HttpClient} from '@angular/common/http';
import {ApiConfig} from '@app/configs/api.config';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {ListPost, Post} from '@app/shared/types/models/news';
import {Snaked} from "@app/shared/utils/SnakeToCamelCase";
import {PostsBaseService} from "@app/views/uits/base/posts-base/posts-base.service";

@Injectable({
  providedIn: 'root'
})
export class NewsService extends PostsBaseService{
  constructor(http: HttpClient) {
    super(http);
    this.type = 'NEWS';
  }
}
