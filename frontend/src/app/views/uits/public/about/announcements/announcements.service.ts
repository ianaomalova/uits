import { Injectable } from '@angular/core';
import {BehaviorSubject, map, Observable} from "rxjs";
import {ListPost, Post} from "@app/shared/types/models/news";
import {HttpClient} from "@angular/common/http";
import {Snaked} from "@app/shared/utils/SnakeToCamelCase";
import {ApiConfig} from "@app/configs/api.config";

@Injectable({
  providedIn: 'root'
})
export class AnnouncementsService {

  posts$: BehaviorSubject<ListPost[]>;

  constructor(private http: HttpClient) {
    this.posts$ = new BehaviorSubject<ListPost[]>([]);
  }

  getPosts(): Observable<ListPost[]> {
    return this.http.get<Snaked<ListPost>[]>(ApiConfig.department.news.announcements, {
    }).pipe(
      map(_posts => {
        console.log(_posts);
        const posts = _posts.map(post => new ListPost(post));
        this.posts$.next(posts);
        return posts;
      })
    );
  }


  getPost(id: number) {
    return this.http.get<Snaked<Post>>(ApiConfig.department.news.announcements + id).pipe(
      map(post => new Post(post))
    );
  }

}
