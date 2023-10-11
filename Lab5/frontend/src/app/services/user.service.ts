import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, tap} from "rxjs";
import {UserModel} from "../models/user.model";
import {RegistrationModel} from "../models/registration.model";
import {AuthModel} from "../models/auth.model";
import {environment} from "../environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  login(user: AuthModel): Observable<UserModel> {
    return this.http.post<UserModel>(environment.origin + '/user/login', user, { withCredentials: true, observe: 'response' })
      .pipe(
        tap({
          next: (data: any) => {
            localStorage.setItem('accessToken', data.headers.get('Authorization'))
          }
        })
      )
  }

  register(user: RegistrationModel): Observable<UserModel> {
    return this.http.post<UserModel>(environment.origin + '/user/registration', user, { withCredentials: true, observe: 'response' })
      .pipe(
        tap({
          next: (data: any) => {
            localStorage.setItem('accessToken', data.headers.get('Authorization'))
          }
        })
      )
  }

  logout() {
    return this.http.post<UserModel>(environment.origin + '/user/logout', { },  { withCredentials: true, observe: 'response' })
      .pipe(
        tap({
          next: (data: any) => {
            localStorage.removeItem('accessToken')
          }
        })
      )
  }
}
