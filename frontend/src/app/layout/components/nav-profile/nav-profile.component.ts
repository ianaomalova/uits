import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {AuthService} from '@app/shared/services/auth.service';
import {getDefaultUserAvatarPath, Profile} from '@app/shared/types/models/auth';
import {PagesConfig} from '@app/configs/pages.config';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

const emptyUser: Partial<Profile> = {
  username: 'Loading...',
  email: 'Loading...',
  firstName: 'Loading...',
  lastName: '',
};

type ProfileMenu = {
  path: string,
  icon: string,
  item: string,
  external: boolean
}

@Component({
  selector: 'nav-profile',
  templateUrl: './nav-profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.header-nav-item]': 'true'
  }
})
export class NavProfileComponent implements OnInit {

  profileMenuList: ProfileMenu[];
  protected readonly PagesConfig = PagesConfig;
  defaultAvatar: string = getDefaultUserAvatarPath();

  constructor(public authService: AuthService,
              public router: Router) {
  }

  ngOnInit(): void {
    this.authService.profile$.subscribe(
      {
        next: profile => {
          if (profile == null || profile.isAnonymous) return;
          this.profileMenuList = [
            {
              path: '',
              icon: 'feather icon-user',
              item: 'NAV.PROFILE.PROFILE',
              external: false
            }
          ]

          if (profile.isModerator || profile.isSuperuser) {
            this.profileMenuList.push({
              path: PagesConfig.admin,
              icon: 'feather icon-command',
              item: 'NAV.PROFILE.ADMIN',
              external: true
            })
          }
          this.profileMenuList.push({
            path: PagesConfig.auth.logout,
            icon: 'feather icon-power',
            item: 'NAV.PROFILE.SIGN_OUT',
            external: false
          });
        }
      }
    )
  }

  navigate(menuItem: ProfileMenu) {
    if (menuItem.external) {
      window.open(menuItem.path);
    } else {
      this.router.navigateByUrl(menuItem.path)
    }
  }
}
