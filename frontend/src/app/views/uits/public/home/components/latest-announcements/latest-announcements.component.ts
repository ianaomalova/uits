import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {NewsService} from "@app/views/uits/public/about/news/news.service";
import {AnnouncementsService} from "@app/views/uits/public/about/announcements/announcements.service";
import {ResizableComponent} from "@app/shared/components/base/resizable.component";
import {map} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, takeUntil} from "rxjs";
import {ListPost} from "@app/shared/types/models/news";
import {PagesConfig} from "@app/configs/pages.config";
import {HomeService} from "@app/views/uits/public/home/home.service";

@Component({
  selector: 'home-latest-announcements',
  templateUrl: './latest-announcements.component.html',
  styleUrls: ['./latest-announcements.component.scss']
})
export class LatestAnnouncementsComponent extends ResizableComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  @Input() title = 'Объявления'

  get posts$(): BehaviorSubject<ListPost[]> {
    return this.homeService.announcements$;
  }

  constructor(private homeService: HomeService) {
    super();
  }

  ngOnInit(): void {
    // this.setPosts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // setPosts() {
  //   this.homeService.getLatestAnnouncements().pipe(
  //   ).subscribe()
  // }

  getPostUrl(id) {
    return PagesConfig.about.announcements + id;
  }
}
