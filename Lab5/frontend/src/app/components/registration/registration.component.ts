import { Component } from "@angular/core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: 'registration.component.html'
})
export class RegistrationComponent {
  form = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.pattern("")]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required)
  })
}
