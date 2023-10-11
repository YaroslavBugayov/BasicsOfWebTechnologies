import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../environment";
import {Observable, of, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private http: HttpClient) { }

  checkToken(): Observable<any> {
    const token = localStorage.getItem('accessToken')
    if (!token || ((JSON.parse(atob(token.split('.')[1]))).exp - (new Date().getTime() / 1000) < 100)) {
      return this.refresh()
    } else {
      return of(null)
    }
  }

  refresh(): Observable<any> {
    return this.http.get<any>(environment.origin + '/user/refresh', { withCredentials: true, observe: 'response' } ).pipe(
      tap({
        next: (data: any) => {
          localStorage.setItem('accessToken', data.headers.get('Authorization'))
        },
        error: (err: any) => {
          console.error(err)
        }
      })
    )
  }
}
