import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

   get(): Observable<UserModel> {
     const headers = new HttpHeaders({
       'Authorization': `Bearer: ${localStorage.getItem('accessToken')}`
     })
      return this.http.get<UserModel>('http://localhost:3000/profile', { withCredentials: true, headers: headers } )
   }
}
