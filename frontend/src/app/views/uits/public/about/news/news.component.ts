import {Component, HostListener, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NewsService} from '@app/views/uits/public/about/news/news.service';
import {ListPost} from '@app/shared/types/models/news';
import {BehaviorSubject} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ModalDirection} from '@app/shared/types/modal-direction';
import {AuthService} from '@app/shared/services/auth.service';
import {Profile} from '@app/shared/types/models/auth';
import {PagesConfig} from '@app/configs/pages.config';
import {ru} from 'date-fns/locale';
import {PostsBaseComponent} from "@app/views/uits/base/posts-base/posts-base.component";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent extends PostsBaseComponent implements OnInit {
  modalRef: BsModalRef;


  createPostTitle = '';
  createPostDescription = '';
  createPostContent = '';


  @ViewChild('createPostModal') createPostModal;
  @ViewChild('deleteConfirmModal') deleteConfirmModal;
  @ViewChild('editPostModal') editPostModal;

  isMobile: boolean;

  selectedImage: File | null = null;

  constructor(private newsService: NewsService,
              private modalService: BsModalService,
              public authService: AuthService) {
    super()
    this.isMobile = window.innerWidth < 992;
  }

  get profile(): Profile {
    return this.authService.profile$.getValue();
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



  ngOnInit(): void {
    this.setPosts();
  }

  setPosts() {
    this.newsService.getPosts().subscribe();
  }


  onCreatePost() {
    console.log('On Create Emit');
    this.openModal(this.createPostModal);
  }


  onCreateConfirm() {
    const formData = new FormData();

    const postToCreate = {
      title: this.createPostTitle,
      short_description: this.createPostDescription,
      content: this.createPostContent
    };

    Object.keys(postToCreate).forEach(key => {
      formData.append(key, postToCreate[key]);
    });

    formData.append('preview_image', this.selectedImage, this.selectedImage.name);

    this.newsService.createPost(
      formData
    ).subscribe(p => {
      this.setPosts();
      this.modalRef.hide();
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, {class: `${ModalDirection.Up}`}));
  }

  getPostURL(id: number) {
    console.log(this.posts$.getValue())
    return PagesConfig.about.news + id;
  }


  onFileSelected(event: any) {
    this.selectedImage = event.target.files[0];
    console.log("Selected image: ", this.selectedImage);
  }

  getDateFromString(dateISO: string): Date {
    return new Date(dateISO);
  }


}
