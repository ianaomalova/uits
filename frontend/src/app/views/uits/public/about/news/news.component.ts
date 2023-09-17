import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NewsService} from '@app/views/uits/public/about/news/news.service';
import {Post} from '@app/shared/types/models/news';
import {BehaviorSubject} from 'rxjs';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ModalDirection} from '@app/shared/types/modal-direction';
import {AuthService} from "@app/shared/services/auth.service";
import {Profile} from "@app/shared/types/models/auth";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  modalRef: BsModalRef;

  chosenPost: Post = null;

  createPostContent = '';

  @ViewChild('deleteConfirmModal') deleteConfirmModal;
  @ViewChild('createPostModal') createPostModal;
  @ViewChild('editPostModal') editPostModal;

  constructor(private newsService: NewsService,
              private modalService: BsModalService,
              private authService: AuthService) {
  }

  get profile(): Profile {
    return this.authService.profile$.getValue();
  }

  get posts$(): BehaviorSubject<Post[]> {
    return this.newsService.posts$;
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
    this.newsService.createPost(this.createPostContent).subscribe(p => {
      this.getPosts();
      this.modalRef.hide();
    });
  }

  onEditConfirm() {
    this.newsService.updatePost(this.chosenPost.id, this.chosenPost.content).subscribe(p => {
      this.getPosts();
      this.modalRef.hide();
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, {class: `${ModalDirection.Up}`}));
  }
}
