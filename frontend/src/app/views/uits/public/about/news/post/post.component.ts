import {Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NewsService} from '@app/views/uits/public/about/news/news.service';
import {Post} from '@app/shared/types/models/news';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ModalDirection} from '@app/shared/types/modal-direction';
import {PagesConfig} from '@app/configs/pages.config';
import {Permission} from '@app/shared/types/permission.enum';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  id: number;
  post$: BehaviorSubject<Post>;
  isMobile: boolean;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
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
    this.newsService.getPost(this.id).subscribe(post => {
      this.post$.next(post);
    });
  }

  protected readonly PagesConfig = PagesConfig;
}
