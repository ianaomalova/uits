import {Component, OnInit} from '@angular/core';
import {EmployeeService} from "@app/views/uits/public/about/employee/employee.service";
import {AVATAR_DEFAULT_URL} from "@app/configs/app.config";
import {AuthService} from "@app/shared/services/auth.service";
import {Router} from "@angular/router";
import {PagesConfig} from "@app/configs/pages.config";

@Component({
  selector: 'app-uvp',
  templateUrl: './uvp.component.html',
  styleUrls: ['./uvp.component.css']
})
export class UVPComponent implements OnInit {
  get employees() {
    return this.employeeService.uvp$;
  }

  constructor(private employeeService: EmployeeService, public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe();
  }

  protected readonly AVATAR_DEFAULT_URL = AVATAR_DEFAULT_URL;

  onEdit() {
    window.open(PagesConfig.admin + `/employee/helpersemployee/`)
  }
}
