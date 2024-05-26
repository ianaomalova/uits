import {Component, HostListener, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ListPost} from "@app/shared/types/models/news";
import {Permission} from "@app/shared/types/permission.enum";
import {NewsService} from "@app/views/uits/public/about/news/news.service";
import {AuthService} from "@app/shared/services/auth.service";
import {Profile} from "@app/shared/types/models/auth";
import {BehaviorSubject, map, Observable} from "rxjs";
import {ModalDirection} from "@app/shared/types/modal-direction";
import {PagesConfig} from "@app/configs/pages.config";
import {ResizableComponent} from "@app/shared/components/base/resizable.component";
import {Pagination} from "@app/shared/types/paginate.interface";
import {HomeService} from "@app/views/uits/public/home/home.service";

@Component({
  selector: 'home-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent extends ResizableComponent implements OnInit {

  @Input() title = 'Новости'


  constructor(private homeService: HomeService) {
    super();
  }

  get posts(): ListPost[] {
    return this.homeService.news$.getValue()
  }
  get posts$(): BehaviorSubject<ListPost[]> {
    return this.homeService.news$
  }

  ngOnInit(): void {
    // this.setPosts();
  }

  // setPosts() {
  //   this.homeService.getLatestNews().subscribe();
  // }

  getFirstPost() {
    const posts = this.posts;
    if (posts !== null && posts.length !== 0) return posts[0];
    return null;
  }


  getSecondPost() {
    const posts = this.posts;
    if (posts !== null && posts.length > 1) return posts[1];
    return null;
  }


  getThirdPost() {
    const posts = this.posts;
    if (posts !== null && posts.length > 2) return posts[2];
    return null;
  }

  getFourthPost() {
    const posts = this.posts;
    if (posts !== null && posts.length > 3) return posts[3];
    return null;
  }


  getPostURL(id: number) {
    return PagesConfig.about.news + id;
  }

}
