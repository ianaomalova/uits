import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {ListPost} from "@app/shared/types/models/news";
import {ApiConfig} from "@app/configs/api.config";
import {Pagination} from "@app/shared/types/paginate.interface";
import {Snaked} from "@app/shared/utils/SnakeToCamelCase";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  announcements$: BehaviorSubject<ListPost[]> = new BehaviorSubject([]);
  news$: BehaviorSubject<ListPost[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {

  }

  getLatestAnnouncements(): Observable<Pagination<ListPost>> {
    return this.getLatestPosts(4, ApiConfig.department.news.announcements, (posts) => this.announcements$.next(posts))
  }
  getLatestNews(): Observable<Pagination<ListPost>> {
    return this.getLatestPosts(5, ApiConfig.department.news.posts, (posts) => this.news$.next(posts))
  }

  private getLatestPosts(limit: number, url: string, onResponse: (posts: ListPost[]) => any){
    return this.http.get<Snaked<Pagination<ListPost>>>(url, {
      params: {limit, offset: 0}
    }).pipe(
      map(response => {
        const _posts = [...response.results]
        const posts = _posts.map(post => new ListPost(post));
        onResponse(posts)
        const camelResponse: Pagination<ListPost> = {...response, results: posts};
        return camelResponse;
      })
    );
  }
}
