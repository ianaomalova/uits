import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {SafeUrl} from '@angular/platform-browser'
import {BehaviorSubject, Subject} from "rxjs";
import {AuthService} from "@app/shared/services/auth.service";
import {Profile} from "@app/shared/types/models/auth";
import {AVATAR_DEFAULT_URL} from "@app/configs/app.config";

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

  defaultAvatar: SafeUrl = AVATAR_DEFAULT_URL
  @Output() openMobilePanel = new EventEmitter();



  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit() {
  }

}
