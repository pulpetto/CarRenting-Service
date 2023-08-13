import { Component } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
    passwordValidator = function (
        control: AbstractControl
    ): ValidationErrors | null {
        const value: string = control.value;

        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(value)) {
            console.log('spk');
            console.log(value);
            return { uppercaseLetterMissing: true };
        }

        // Check for at least one lowercase letter
        if (!/[a-z]/.test(value)) {
            return { lowercaseLetterMissing: true };
        }

        // Check for symbols (non-alphanumeric characters)
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-]/.test(value)) {
            return {
                symbolMissing: true,
            };
        }

        // dołuż sprawdzanie na cyferki i długość kótasa
        return null;
    };

    loginForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        age: new FormControl('', [Validators.pattern('^[0-9]*$')]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(8),
            this.passwordValidator.bind(this),
        ]),
        repeatPassword: new FormControl('', [Validators.required]),
    });
}
