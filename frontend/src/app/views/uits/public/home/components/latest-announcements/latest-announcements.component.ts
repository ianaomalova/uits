import {Component, HostListener, Input, OnInit} from '@angular/core';
import {NewsService} from "@app/views/uits/public/about/news/news.service";
import {AnnouncementsService} from "@app/views/uits/public/about/announcements/announcements.service";
import {ResizableComponent} from "@app/shared/components/base/resizable.component";
import {map} from 'rxjs/operators';
import {BehaviorSubject} from "rxjs";
import {ListPost} from "@app/shared/types/models/news";
import {PagesConfig} from "@app/configs/pages.config";

@Component({
  selector: 'home-latest-announcements',
  templateUrl: './latest-announcements.component.html',
  styleUrls: ['./latest-announcements.component.scss']
})
export class LatestAnnouncementsComponent extends ResizableComponent implements OnInit {

  @Input() title = 'Объявления'

  posts$: BehaviorSubject<ListPost[]>;

  constructor(private announcementService: AnnouncementsService) {
    super();
    this.posts$ = new BehaviorSubject<ListPost[]>([]);
  }

  ngOnInit(): void {
    this.setPosts();
  }

  setPosts() {
    this.announcementService.getPosts().pipe(
      map(posts => {
        this.posts$.next(posts.slice(0, 4));
      })
    ).subscribe();
  }

  getFirstPost() {
    const posts = this.announcementService.posts$.getValue();
    if (posts !== null && posts.length !== 0) return posts[0];
    return null;
  }


  getSecondPost() {
    const posts = this.announcementService.posts$.getValue();
    if (posts !== null && posts.length > 1) return posts[1];
    return null;
  }


  getThirdPost() {
    const posts = this.announcementService.posts$.getValue();
    if (posts !== null && posts.length > 2) return posts[2];
    return null;
  }

  getFourthPost() {
    const posts = this.announcementService.posts$.getValue();
    if (posts !== null && posts.length > 3) return posts[3];
    return null;
  }

  getPostUrl(id) {
    return PagesConfig.about.announcements + id;
  }
}
