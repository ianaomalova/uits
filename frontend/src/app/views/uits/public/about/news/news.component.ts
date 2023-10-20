import {Component, HostListener, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NewsService} from '@app/views/uits/public/about/news/news.service';
import {Post} from '@app/shared/types/models/news';
import {BehaviorSubject} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ModalDirection} from '@app/shared/types/modal-direction';
import {AuthService} from '@app/shared/services/auth.service';
import {Profile} from '@app/shared/types/models/auth';
import {PagesConfig} from '@app/configs/pages.config';
import {Permission} from '@app/shared/types/permission.enum';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {
  modalRef: BsModalRef;

  chosenPost: Post = null;

  createPostTitle = '';
  createPostDescription = '';
  createPostContent = '';

  changePermission: Permission = Permission.MODERATOR;

  @ViewChild('createPostModal') createPostModal;
  @ViewChild('deleteConfirmModal') deleteConfirmModal;
  @ViewChild('editPostModal') editPostModal;

  isMobile: boolean;

  constructor(private newsService: NewsService,
              private modalService: BsModalService,
              private authService: AuthService) {

    this.isMobile = window.innerWidth < 992;
  }

  get profile(): Profile {
    return this.authService.profile$.getValue();
  }

  get posts$(): BehaviorSubject<Post[]> {
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
    this.getPosts();
  }

  getPosts() {
    this.newsService.getPosts().subscribe();
  }

  onCreatePost(postId: Post['id']) {
    console.log('On Create Emit');
    this.openModal(this.createPostModal);
  }

  onEditPost(postId: Post['id']) {
    console.log('On Edit Emit');
    this.chosenPost = this.post(postId);
    this.openModal(this.editPostModal);
  }

  onDeletePost(postId: Post['id']) {
    console.log('On Delete Emit');
    this.chosenPost = this.post(postId);
    this.openModal(this.deleteConfirmModal);
  }

  onDeleteConfirm() {
    this.newsService.deletePost(this.chosenPost.id).subscribe(res => {
      console.log(res);
      this.getPosts();
      this.modalRef.hide();
    });
  }

  onCreateConfirm() {
    const postToCreate = {
      title: this.createPostTitle,
      shortDescription: this.createPostDescription,
      content: this.createPostContent
    };
    this.newsService.createPost(
      postToCreate
    ).subscribe(p => {
      this.getPosts();
      this.modalRef.hide();
    });
  }

  onEditConfirm() {
    const postToEdit = {
      title: this.chosenPost.title,
      short_description: this.chosenPost.shortDescription,
      content: this.chosenPost.content,
    };
    this.newsService.updatePost(this.chosenPost.id, postToEdit).subscribe(p => {
      this.getPosts();
      this.modalRef.hide();
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, {class: `${ModalDirection.Up}`}));
  }

  getPostURL(id: number) {
    return PagesConfig.about.news + id;
  }

  onEditorResize($event: UIEvent) {
    // $event.
  }

  cancelChanges() {
    this.modalRef.hide();
    this.getPosts();
  }
}
