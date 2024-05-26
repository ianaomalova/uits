import {PagesConfig} from "@app/configs/pages.config";
import {ru} from "date-fns/locale";
import {BehaviorSubject} from "rxjs";
import {ListPost} from "@app/shared/types/models/news";

export abstract class PostsBaseComponent {
  locale = ru;

  abstract get posts$(): BehaviorSubject<ListPost[]>;
  abstract setPosts(): void;

  post(id: number) {
    return this.posts$.getValue().find(p => p.id === id);
  }

  redirectToCreatePage() {
    window.open(PagesConfig.admin + "/news/post/add/")
  }

  redirectToEditPage(id: number) {
    window.open(`${PagesConfig.admin}/news/post/${id}/change/`)
  }
}
