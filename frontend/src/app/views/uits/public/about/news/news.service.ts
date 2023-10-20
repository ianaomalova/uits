import {Injectable} from '@angular/core';
import {OnPaginate} from '@app/shared/types/paginate.interface';
import {HttpClient} from '@angular/common/http';
import {ApiConfig} from '@app/configs/api.config';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {IPost, Post} from '@app/shared/types/models/news';
import {Snaked} from "@app/shared/utils/SnakeToCamelCase";

@Injectable({
  providedIn: 'root'
})
export class NewsService implements OnPaginate {

  page = 1;
  itemsPerPage = 15;

  posts$: BehaviorSubject<Post[]>;

  constructor(private http: HttpClient) {
    this.posts$ = new BehaviorSubject<Post[]>([]);
  }

  getPosts(page = this.page): Observable<Post[]> {
    return this.http.get<Snaked<IPost>[]>(ApiConfig.department.news.posts).pipe(
      map(_posts => {
        console.log(_posts);
        const posts = _posts.map(post => new Post(post));
        this.posts$.next(posts);
        return posts;
      })
    );
  }

  deletePost(id: number) {
    return this.http.delete(ApiConfig.department.news.posts + id);
  }

  createPost({title, shortDescription, content}) {
    return this.http.post(ApiConfig.department.news.posts, {
      title,
      short_description: shortDescription,
      content
    });
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
