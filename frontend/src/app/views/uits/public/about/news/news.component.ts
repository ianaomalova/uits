import {Component, HostListener, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NewsService} from '@app/views/uits/public/about/news/news.service';
import {ListPost} from '@app/shared/types/models/news';
import {BehaviorSubject, Subject, takeUntil} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ModalDirection} from '@app/shared/types/modal-direction';
import {AuthService} from '@app/shared/services/auth.service';
import {Profile} from '@app/shared/types/models/auth';
import {PagesConfig} from '@app/configs/pages.config';
import {ru} from 'date-fns/locale';
import {PostsBaseComponent} from "@app/views/uits/base/posts-base/posts-base.component";
import {Pagination} from "@app/shared/types/paginate.interface";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {HttpParams} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {PaginationService} from "@app/shared/services/pagination.service";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent extends PostsBaseComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  modalRef: BsModalRef;


  @ViewChild('createPostModal') createPostModal;
  @ViewChild('deleteConfirmModal') deleteConfirmModal;
  @ViewChild('editPostModal') editPostModal;

  isMobile: boolean;
  _page: number = 1;
  defaultLimit = 10;
  defaultOffset = 0;

  constructor(private newsService: NewsService,
              private paginationService: PaginationService,
              public authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {
    super()
    this.isMobile = window.innerWidth < 992;
  }


  get profile(): Profile {
    return this.authService.profile$.getValue();
  }

  get response$(): BehaviorSubject<Pagination<ListPost>> {
    return this.newsService.paginatedResponse$;
  }

  get itemsPerPage(): number {
    return this.defaultLimit - this.defaultOffset;
  }

  get page(): number {
    return this._page;
  }

  set page(value: number) {
    this._page = value;
  }

  @HostListener('window:resize', ['$event']) onWindowResize(event) {
    if (event.target.innerWidth < 992) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  ngOnInit(): void {
    const {limit, offset} = this.paginationService.getPaginationParams();
    if (limit !== undefined && offset !== undefined) {
      this.page = Math.round(offset / limit) + 1
      console.log(this.page)
    }
    this.setPosts();
  }

  ngOnDestroy(): void {
    console.log('destroy called')
    this.destroy$.next();
    this.destroy$.complete();
  }

  setPosts() {
    const {limit, offset} = this.paginationService.getPaginationParams();
    this.newsService.getPosts(limit, offset).pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  getPostURL(id: number) {
    return PagesConfig.about.news + id;
  }

  getDateFromString(dateISO: string): Date {
    return new Date(dateISO);
  }


  pageChanged($event: PageChangedEvent) {
    let {limit, offset} = this.paginationService.getPaginationParams();
    if (!limit) limit = this.defaultLimit;
    if (!offset) offset = this.defaultOffset;
    const newOffset = (limit * ($event.page - 1))
    this.page = $event.page
    this.paginationService.setPaginationParams(limit, newOffset).then(ok => {
      console.log(limit, offset, this.page);
      this.setPosts();
    })
  }
}
