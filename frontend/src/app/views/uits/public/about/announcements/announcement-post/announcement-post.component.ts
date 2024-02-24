import {Component, HostListener, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Post} from "@app/shared/types/models/news";
import {ActivatedRoute} from "@angular/router";
import {AnnouncementsService} from "@app/views/uits/public/about/announcements/announcements.service";
import {PagesConfig} from "@app/configs/pages.config";

@Component({
  selector: 'app-announcement-post',
  templateUrl: './announcement-post.component.html',
  styleUrls: ['./announcement-post.component.css']
})
export class AnnouncementPostComponent implements OnInit {

  id: number;
  post$: BehaviorSubject<Post>;
  isMobile: boolean;

  constructor(
    private route: ActivatedRoute,
    private announcementService: AnnouncementsService,
  ) {
    this.post$ = new BehaviorSubject<Post>(null);
    this.isMobile = window.innerWidth < 992;

  }

  get post(): Post {
    return this.post$.getValue();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.getPost();
    });
  }

  @HostListener('window:resize', ['$event']) onWindowResize(event) {
    if (event.target.innerWidth < 992) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  getPost() {
    this.announcementService.getPost(this.id).subscribe(post => {
      this.post$.next(post);
    });
  }

  protected readonly PagesConfig = PagesConfig;

}
