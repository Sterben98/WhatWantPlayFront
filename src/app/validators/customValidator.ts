import { AbstractControl, ValidationErrors } from "@angular/forms";
import { UserService } from "../components/users/services/user.service";

export class CustomValidator{

    constructor(private userService: UserService){}

    static password(control: AbstractControl){
        
        let password= control.value;
        const COD_PASS_REGEXP = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        const error= !COD_PASS_REGEXP.test(password);
        return error ? { 'codPASSFormatError': { valid: false, value: password } } : null
    }
}