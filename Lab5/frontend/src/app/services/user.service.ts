import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthModel} from "../models/auth.model";
import {Observable} from "rxjs";
import {ResponseModel} from "../models/response.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  login(user: AuthModel): Observable<ResponseModel> {
    return this.http.post<ResponseModel>('localhost:3000/user/login', user);
  }
}
