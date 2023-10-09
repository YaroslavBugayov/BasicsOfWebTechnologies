import { Component } from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {AuthModel} from "../../models/auth.model";

@Component({
  selector: 'app-login',
  styles: [`
        input.ng-touched.ng-invalid {border:solid red 2px;}
        input.ng-touched.ng-valid {border:solid green 2px;}
    `],
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  form: FormGroup

  constructor(private userService: UserService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.pattern("^(?=\\S{8,}$).*")])
    })
  }

  submit() {
    const user: AuthModel = {
      email: this.form.value.email,
      password: this.form.value.password
    }
    this.userService.login(user)
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
