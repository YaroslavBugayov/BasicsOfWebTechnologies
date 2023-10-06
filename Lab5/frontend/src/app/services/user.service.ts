import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {AuthModel} from "../models/auth.model";
import {Observable} from "rxjs";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  login(user: AuthModel): Observable<UserModel> {
    return this.http.post<UserModel>('localhost:3000/user/login', user);
  }
}
