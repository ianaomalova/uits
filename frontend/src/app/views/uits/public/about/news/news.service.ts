import {Injectable} from '@angular/core';
import {OnPaginate} from '@app/shared/types/paginate.interface';
import {HttpClient} from '@angular/common/http';
import {ApiConfig} from '@app/configs/api.config';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {IPost, ListPost, Post} from '@app/shared/types/models/news';
import {Snaked} from "@app/shared/utils/SnakeToCamelCase";

@Injectable({
  providedIn: 'root'
})
export class NewsService implements OnPaginate {

  page = 1;
  itemsPerPage = 15;

  posts$: BehaviorSubject<ListPost[]>;

  constructor(private http: HttpClient) {
    this.posts$ = new BehaviorSubject<ListPost[]>([]);
  }

  getPosts(page = this.page): Observable<ListPost[]> {
    return this.http.get<Snaked<ListPost>[]>(ApiConfig.department.news.posts, {
      params: {
        page
      }
    }).pipe(
      map(_posts => {
        console.log(_posts);
        const posts = _posts.map(post => new ListPost(post));
        this.posts$.next(posts);
        return posts;
      })
    );
  }

  deletePost(id: number) {
    return this.http.delete(ApiConfig.department.news.posts + id);
  }

  createPost(formData: FormData) {
    return this.http.post(ApiConfig.department.news.posts, formData);
  }

  updatePost(id: number, postToEdit) {
    return this.http.patch<Snaked<Post>>(ApiConfig.department.news.posts + id, {
      ...postToEdit
    }).pipe(
      map(post => new Post(post))
    );
  }

  getPost(id: number) {
    return this.http.get<Snaked<Post>>(ApiConfig.department.news.posts + id).pipe(
      map(post => new Post(post))
    );
  }
}
