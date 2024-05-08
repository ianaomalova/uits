import {ProfileComponent} from './profile.component';
import {AuthGuard} from "@app/shared/guards/auth.guard";

export const routes = [{
  path: '', component: ProfileComponent, data: {
    hidePageHeader: true,
  },
  canActivate: [AuthGuard]
}];
