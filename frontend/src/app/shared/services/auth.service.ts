import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginForm} from '@app/shared/types/models/forms';
import {ApiConfig} from '@app/configs/api.config';
import {Profile} from '@app/shared/types/models/auth';
import {map} from 'rxjs/operators';
import {SnakeObjectToCamelCase} from '@app/shared/utils/SnakeToCamelCase';
import {BehaviorSubject, catchError, Observable, of, throwError} from 'rxjs';


const Anonymous: Profile = {
  username: 'anonymous',
  isSuperuser: false,
  isModerator: false,
  isAnonymous: true,
  email: null,
  lastName: '',
  firstName: ''
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  profile$: BehaviorSubject<Profile>;

  constructor(private http: HttpClient) {
    this.profile$ = new BehaviorSubject<Profile>(Anonymous);
    this.retrieveProfile().subscribe((p) => {
      console.log(p, 'ok');
    });
  }

  login(data: LoginForm) {
    return this.http.post(ApiConfig.auth.login, data).pipe(map(key => {
      this.retrieveProfile().subscribe();
      return key;
    }));
  }

  logout() {
    return this.http.post(ApiConfig.auth.logout, null);
  }


  retrieveProfile(): Observable<Profile> {
    return this.http.get<Profile>(ApiConfig.auth.user).pipe(
      map(profile => {
        this.profile$.next(SnakeObjectToCamelCase(profile) as Profile);
        return profile;
      }),
      catchError((err, caught) => {
        this.profile$.next(Anonymous);
        return throwError(err);
      })
    );
  }
}
