import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { UserService } from '../components/users/services/user.service';

@Directive({
  selector: '[username-validator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: UsernameValidatorDirective,
    multi: true
  }]
})
export class UsernameValidatorDirective implements Validator {

  constructor(private userService: UserService) { }

  validate(control: AbstractControl): any{

    
  }

}
