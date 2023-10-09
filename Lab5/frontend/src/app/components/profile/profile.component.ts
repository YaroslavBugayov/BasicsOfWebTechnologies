import {Component, OnInit} from "@angular/core";
import {UserService} from "../../services/user.service";
import {ProfileService} from "../../services/profile.service";
import {UserModel} from "../../models/user.model";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit {

  profile: UserModel | undefined

  constructor(private profileService: ProfileService) { }

  ngOnInit() {
    this.profileService.get()
      .subscribe({
        next: (data: any) => {
          console.log(data)
          this.profile = {
            name: data.profile.name,
            group: data.profile.group,
            idCard: data.profile.idCard,
            birthDate: data.profile.birthDate,
            email: data.profile.email
          }
        },
        error: (error: any) => {
          alert(error.error.message)
        }
      })
  }
}
