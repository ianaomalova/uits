import {Component, HostListener, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ListPost} from "@app/shared/types/models/news";
import {Permission} from "@app/shared/types/permission.enum";
import {NewsService} from "@app/views/uits/public/about/news/news.service";
import {AuthService} from "@app/shared/services/auth.service";
import {Profile} from "@app/shared/types/models/auth";
import {BehaviorSubject} from "rxjs";
import {ModalDirection} from "@app/shared/types/modal-direction";
import {PagesConfig} from "@app/configs/pages.config";

@Component({
  selector: 'home-latest-news',
  templateUrl: './latest-news.component.html',
  styleUrls: ['./latest-news.component.scss']
})
export class LatestNewsComponent implements OnInit {

  @Input() title = 'Новости'
  @Input() isEditable: boolean = true


  @ViewChild('createPostModal') createPostModal;
  @ViewChild('deleteConfirmModal') deleteConfirmModal;
  @ViewChild('editPostModal') editPostModal;

  isMobile: boolean;

  constructor(private newsService: NewsService) {

    this.isMobile = window.innerWidth < 992;
  }

  get posts$(): BehaviorSubject<ListPost[]> {
    return this.newsService.posts$;
  }

  @HostListener('window:resize', ['$event']) onWindowResize(event) {
    if (event.target.innerWidth < 992) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  post(id: number) {
    return this.posts$.getValue().find(p => p.id === id);
  }

  ngOnInit(): void {
    this.setPosts();
  }

  setPosts() {
    this.newsService.getPosts().subscribe();
  }

  getFirstPost() {
    const posts = this.newsService.posts$.getValue();
    if (posts !== null && posts.length !== 0) return posts[0];
    return null;
  }


  getSecondPost() {
    const posts = this.newsService.posts$.getValue();
    if (posts !== null && posts.length > 1) return posts[1];
    return null;
  }


  getThirdPost() {
    const posts = this.newsService.posts$.getValue();
    if (posts !== null && posts.length > 2) return posts[2];
    return null;
  }

  getFourthPost() {
    const posts = this.newsService.posts$.getValue();
    if (posts !== null && posts.length > 3) return posts[3];
    return null;
  }


  getPostURL(id: number) {
    console.log(this.posts$.getValue())
    return PagesConfig.about.news + id;
  }

}
