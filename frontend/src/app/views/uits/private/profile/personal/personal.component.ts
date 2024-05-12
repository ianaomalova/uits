import {Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {SafeUrl} from '@angular/platform-browser'
import {BehaviorSubject, Subject} from "rxjs";
import {AuthService} from "@app/shared/services/auth.service";
import {Profile} from "@app/shared/types/models/auth";
import {AVATAR_DEFAULT_URL} from "@app/configs/app.config";
import {Clipboard} from "@angular/cdk/clipboard";
import {ModalDirection} from "@app/shared/types/modal-direction";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ApiConfig} from "@app/configs/api.config";
import {HttpClient} from "@angular/common/http";

interface PersonalInfo {
  username: string,
  email: string,
}

@Component({
  selector: 'profile-personal',
  templateUrl: './personal.component.html',
  styles: [`
    ::ng-deep .upload {
      width: 100%
    }
  `]
})
export class PersonalComponent implements OnInit {
  hideIntegrationCode = true;
  defaultAvatar: SafeUrl = AVATAR_DEFAULT_URL
  @Output() openMobilePanel = new EventEmitter();
  @ViewChild('deleteIntegrationConfirmModal') deleteIntegrationConfirmModal;
  modalRef: BsModalRef

  constructor(
    public authService: AuthService,
    private clipboard: Clipboard,
    private modalService: BsModalService,
    private http: HttpClient
  ) {
  }

  ngOnInit() {
  }

  toggleViewIntegrationCode() {
    this.hideIntegrationCode = !this.hideIntegrationCode
  }

  copyCode(telegramCode: string) {
    this.clipboard.copy(telegramCode);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, Object.assign({}, {class: `${ModalDirection.Up}`}));
  }

  closeModal() {
    this.modalRef.hide();
  }

  deleteIntegration() {
    this.http.delete(ApiConfig.telegram.user + '/' + this.authService.profile$.getValue().telegramUser.id).subscribe({
      next: () => {
        this.authService.retrieveProfile().subscribe(()=> {
          this.closeModal()
        })
      }
    })
  }
}
