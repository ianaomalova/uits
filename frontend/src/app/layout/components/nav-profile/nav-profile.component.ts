import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from '@app/shared/services/auth.service';
import {Profile} from '@app/shared/types/models/auth';
import {PagesConfig} from '@app/configs/pages.config';
import {Router} from '@angular/router';

const emptyUser: Partial<Profile> = {
  username: 'Loading...',
  email: 'Loading...',
  firstName: 'Loading...',
  lastName: '',
};

@Component({
  selector: 'nav-profile',
  templateUrl: './nav-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.header-nav-item]': 'true'
  }
})
export class NavProfileComponent implements OnInit {

  profileMenuList = [
    {
      path: '',
      icon: 'feather icon-user',
      item: 'Profile'
    },
    {
      path: PagesConfig.auth.logout,
      icon: 'feather icon-power',
      item: 'Sign Out'
    }
  ];
  protected readonly PagesConfig = PagesConfig;

  constructor(private authService: AuthService,
              public router: Router) {
  }

  get profile(): Profile {
    return this.authService.profile$.getValue() ?? emptyUser as Profile;
  }

  ngOnInit(): void {
  }
}
