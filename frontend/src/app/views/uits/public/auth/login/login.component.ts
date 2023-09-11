import { Component, OnInit } from '@angular/core';
import {LoginForm} from "@app/shared/types/models/forms";
import {AuthService} from "@app/shared/services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
  }

  login(data: LoginForm) {
    this.authService.login(data).subscribe();
  }
}
