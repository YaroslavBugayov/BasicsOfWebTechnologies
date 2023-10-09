import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserModel} from "../models/user.model";
import AuthModel from "../models/auth.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  login(user: AuthModel) {
    console.log(user)
    return this.http.post('http://localhost:3000/user/login', user);
  }
}
