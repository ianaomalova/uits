import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {LoginForm} from "@app/shared/types/models/forms";
import {ApiConfig} from "@app/configs/api.config";
import {Profile} from "@app/shared/types/models/auth";
import {map} from "rxjs/operators";
import {SnakeObjectToCamelCase} from "@app/shared/utils/SnakeToCamelCase";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  profile: Profile

  constructor(private http: HttpClient) {
  }

  login(data: LoginForm) {
    return this.http.post(ApiConfig.auth.login, data).pipe(map(profile =>
      SnakeObjectToCamelCase(profile)));
  }
}
