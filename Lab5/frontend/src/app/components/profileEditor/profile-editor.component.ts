import {Component} from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProfileService} from "../../services/profile.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {RegistrationModel} from "../../models/registration.model";
import {UserModel} from "../../models/user.model";
import {ChangeProfileModel} from "../../models/change-profile.model";

@Component({
  selector: 'app-profile-editor',
  templateUrl: 'profile-editor.component.html',
  styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `],
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '40px',
      })),
      state('closed', style({
        height: '0px',
      })),
      transition('* => *',
        animate('0.5s ease')
      ),
    ])
  ]
})
export class ProfileEditorComponent {
  form: FormGroup

  constructor(private profileService: ProfileService) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][a-z]+\\s[A-Z][a-z]+$')]),
      group: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][A-Z]-[0-9][0-9]$')]),
      idCard: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][A-Z]\\s№[0-9]{6}$')]),
      birthDate: new FormControl(null, [Validators.required]),
    })
  }

  submit() {
    const user: ChangeProfileModel = {
      name: this.form.value.name,
      group: this.form.value.group,
      idCard: this.form.value.name,
      birthDate: this.form.value.birthDate,
    }
    this.profileService.change(user)
      .subscribe({
        next: (data: any) => {
          window.location.reload()
        },
        error: (error: any) => {
          alert(error.error.message)
        }
      })
  }
}
