import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NewsService} from "@app/views/uits/public/about/news/news.service";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {PagesConfig} from "@app/configs/pages.config";
import {ModalDirection} from "@app/shared/types/modal-direction";
import {Permission} from "@app/shared/types/permission.enum";
import {Post} from "@app/shared/types/models/news";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-post-content',
  templateUrl: './post-content.component.html',
  styleUrls: ['./post-content.component.scss']
})
export class PostContentComponent implements OnInit {
  modalRef: BsModalRef;
  changePermission: Permission = Permission.MODERATOR;
  @Input() post: BehaviorSubject<Post>;
  @ViewChild('deleteConfirmModal') deleteConfirmModal;
  @ViewChild('editPostModal') editPostModal;

  constructor(private newsService: NewsService,
              private modalService: BsModalService,
              private router: Router) {
  }

  ngOnInit(): void {
  }


  getPost(){
    return this.post.getValue();
  }

  onEditPost($event: number) {
    this.openModal(this.editPostModal);
  }

  onEditConfirm() {
    const postToEdit = {
      title: this.getPost().title,
      short_description: this.getPost().shortDescription,
      content: this.getPost().content,
    };
    this.newsService.updatePost(this.getPost().id, postToEdit).subscribe(p => {
      this.post.next(p);
      this.modalRef.hide();
    });
  }

  onDeletePost($event: number) {
    this.openModal(this.deleteConfirmModal);
  }

  onDeleteConfirm() {
    this.newsService.deletePost(this.getPost().id).subscribe(res => {
      console.log(res);
      this.modalRef.hide();
      this.router.navigateByUrl(this.getReturnURL());
    });
  }

  getReturnURL() {
    return PagesConfig.about.news;
  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, {class: `${ModalDirection.Up}`}));
  }

  cancelChanges() {
    this.modalRef.hide();
    this.getPost();
  }
}
