import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {ProfileService} from "../../services/profile.service";
import {UserModel} from "../../models/user.model";
import {HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {JwtService} from "../../services/jwt.service";

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {

  profile: UserModel | undefined

  constructor(private profileService: ProfileService, private userService: UserService, private jwtService: JwtService, private router: Router) { }

  ngOnInit() {
    this.jwtService.checkToken().subscribe({
      next: (data: any) => {
        this.profileService.get()
          .subscribe({
            next: (data: any) => {
              this.profile = {
                name: data.profile.name,
                group: data.profile.group,
                idCard: data.profile.idCard,
                birthDate: data.profile.birthDate,
                email: data.profile.email
              }
            },
            error: (error: any) => {
              this.router.navigate(['/login'])
            }
          })
      },
      error: (err: any) => {
        this.router.navigate(['/login'])
      }
    })
  }

  logout() {
    this.userService.logout()
      .subscribe({
        next: (data: any) => {
          this.router.navigate(['/login'])
        },
        error: (error: any) => {
          alert(error.error.message)
        }
      })
  }

  changeProfile() {

  }
}
