import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {UserModel} from "../models/user.model";
import {environment} from "../environment";
import {ChangeProfileModel} from "../models/change-profile.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private http: HttpClient) { }

   get(id: string | null): Observable<UserModel> {
     const headers = new HttpHeaders({
       'Authorization': `Bearer: ${localStorage.getItem('accessToken')}`
     })
      return this.http.get<UserModel>(environment.origin + `/profile/${id ?? ''}` , { withCredentials: true, headers: headers } )
   }

   change(user: ChangeProfileModel, id: string | null): Observable<UserModel> {
     const headers = new HttpHeaders({
       'Authorization': `Bearer: ${localStorage.getItem('accessToken')}`
     })
     return this.http.put<UserModel>(environment.origin + `/profile/change/${id ?? ''}`, user, { withCredentials: true, observe: 'response', headers: headers })
       .pipe(
         tap({
           next: (data: any) => {
             window.location.reload()
           }
         })
       )
   }
}
