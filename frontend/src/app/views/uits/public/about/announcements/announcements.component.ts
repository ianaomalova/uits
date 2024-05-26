import {Component, HostListener, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {AnnouncementsService} from "@app/views/uits/public/about/announcements/announcements.service";
import {BsModalService} from "ngx-bootstrap/modal";
import {ru} from "date-fns/locale";
import {AuthService} from "@app/shared/services/auth.service";
import {Profile} from "@app/shared/types/models/auth";
import {BehaviorSubject, Observable, Subject, takeUntil} from "rxjs";
import {ListPost} from "@app/shared/types/models/news";
import {PagesConfig} from "@app/configs/pages.config";
import {PostsBaseComponent} from "@app/views/uits/base/posts-base/posts-base.component";
import {Pagination} from "@app/shared/types/paginate.interface";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {PaginationService} from "@app/shared/services/pagination.service";

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.css']
})
export class AnnouncementsComponent extends PostsBaseComponent implements OnInit, OnDestroy {
  defaultLimit = 10;
  defaultOffset = 0;
  _page: number = 1;
  destroy$: Subject<void> = new Subject<void>();
  isMobile: boolean;

  selectedImage: File | null = null;

  constructor(private announcementService: AnnouncementsService,
              public authService: AuthService,
              private paginationService: PaginationService) {
    super()
    this.isMobile = window.innerWidth < 992;
  }

  get profile(): Profile {
    return this.authService.profile$.getValue();
  }

  get response$(): BehaviorSubject<Pagination<ListPost>> {
    return this.announcementService.paginatedResponse$
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
    this.announcementService.getPosts(limit, offset).pipe(
      takeUntil(this.destroy$)
    ).subscribe();
  }

  getPostURL(id: number) {
    return PagesConfig.about.announcements + id;
  }


  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    console.log("Selected image: ", this.selectedImage);
  }

  getDateFromString(dateISO: string): Date {
    return new Date(dateISO);
  }

  pageChanged($event: PageChangedEvent) {
    let {limit, offset} = this.paginationService.getPaginationParams();
    if (!limit) limit = this.defaultLimit;
    const newOffset = (limit * ($event.page - 1))
    this.page = $event.page
    this.paginationService.setPaginationParams(limit, newOffset).then(ok => {
      console.log(limit, newOffset, this.page);
      this.setPosts();
    })
  }
}
