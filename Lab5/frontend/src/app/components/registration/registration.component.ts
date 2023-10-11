import { Component } from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {RegistrationModel} from "../../models/registration.model";

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html',
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
export class RegistrationComponent {
  form: FormGroup

  constructor(private userService: UserService, private router: Router) {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][a-z]+\\s[A-Z][a-z]+$')]),
      group: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][A-Z]-[0-9][0-9]$')]),
      idCard: new FormControl(null, [Validators.required, Validators.pattern('^[A-Z][A-Z]\\s№[0-9]{6}$')]),
      birthDate: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern('^(?=\\S{8,}$).*')])
    })
  }

  submit() {
    const user: RegistrationModel = {
      name: this.form.value.name,
      group: this.form.value.group,
      idCard: this.form.value.name,
      birthDate: this.form.value.birthDate,
      email: this.form.value.email,
      password: this.form.value.password,
    }
    this.userService.register(user)
      .subscribe({
        next: (data: any) => {
          this.router.navigate(['/profile'])
        },
        error: (error: any) => {
          alert(error.error.message)
        }
      })
  }
}
