import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
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
    modalRef: BsModalRef;
    changePermission: Permission = Permission.MODERATOR;
    @ViewChild('deleteConfirmModal') deleteConfirmModal;
    @ViewChild('editPostModal') editPostModal;

    constructor(
        private route: ActivatedRoute,
        private newsService: NewsService,
        private modalService: BsModalService,
        private router: Router
    ) {
        this.post$ = new BehaviorSubject<Post>(null);
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

    getPost() {
        this.newsService.getPost(this.id).subscribe(post => {
            this.post$.next(post);
        });
    }

    getReturnURL() {
        return PagesConfig.about.news;
    }

    onEditPost($event: number) {
        this.openModal(this.editPostModal);
    }

    onEditConfirm() {
        const postToEdit = {
            title: this.post.title,
            short_description: this.post.shortDescription,
            content: this.post.content,
        };
        this.newsService.updatePost(this.post.id, postToEdit).subscribe(p => {
            this.post$.next(p);
            this.modalRef.hide();
        });
    }

    onDeletePost($event: number) {
        this.openModal(this.deleteConfirmModal);
    }

    onDeleteConfirm() {
        this.newsService.deletePost(this.post.id).subscribe(res => {
            console.log(res);
            this.modalRef.hide();
            this.router.navigateByUrl(this.getReturnURL());
        });
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template, Object.assign({}, {class: `${ModalDirection.Up}`}));
    }

    cancelChanges() {
        this.modalRef.hide();
        this.getPost();
    }
}
