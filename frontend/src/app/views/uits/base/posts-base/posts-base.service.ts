import {BehaviorSubject, map, Observable} from "rxjs";
import {Pagination} from "@app/shared/types/paginate.interface";
import {ListPost, Post} from "@app/shared/types/models/news";
import {HttpClient} from "@angular/common/http";
import {Snaked} from "@app/shared/utils/SnakeToCamelCase";
import {ApiConfig} from "@app/configs/api.config";

type PostType = 'ANNOUNCEMENTS' | 'NEWS'

export class PostsBaseService {
  page: number = 1;
  type: PostType = 'NEWS'
  paginatedResponse$: BehaviorSubject<Pagination<ListPost>>;


  constructor(protected http: HttpClient) {
    this.paginatedResponse$ = new BehaviorSubject<Pagination<ListPost>>(null);
  }

  getPosts(_limit?: number, _offset?: number): Observable<Pagination<ListPost>> {
    return this.http.get<Snaked<Pagination<ListPost>>>(this.getUrl(), {
      params: {limit: _limit ? _limit : 10, offset: _offset ? _offset : 0}
    }).pipe(
      map(response => {
        const _posts = response.results
        console.log(_posts);
        const posts = _posts.map(post => new ListPost(post));
        const camelResponse: Pagination<ListPost> = {...response, results: posts};
        this.paginatedResponse$.next(camelResponse);
        return camelResponse;
      })
    );
  }

  deletePost(id: number) {
    return this.http.delete(this.getUrl() + id);
  }

  createPost(formData: FormData) {
    return this.http.post(this.getUrl(), formData);
  }

  updatePost(id: number, postToEdit) {
    return this.http.patch<Snaked<Post>>(this.getUrl() + id, {
      ...postToEdit
    }).pipe(
      map(post => new Post(post))
    );
  }

  getPost(id: number) {
    return this.http.get<Snaked<Post>>(this.getUrl() + id).pipe(
      map(post => new Post(post))
    );
  }

  getUrl(){
    switch (this.type) {
      case "ANNOUNCEMENTS":
        return ApiConfig.department.news.announcements
      case "NEWS":
        return ApiConfig.department.news.posts
    }
  }
}
