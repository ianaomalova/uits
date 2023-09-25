import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ApiConfig} from "@app/configs/api.config";

@Injectable({
  providedIn:'root'
})
export class EmployeeService {
  constructor(private http: HttpClient) {
  }

  getAllEmployees() {
    return this.http.get(ApiConfig.department.employee.employee)
  }

}
