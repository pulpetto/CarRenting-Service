import { Component } from '@angular/core';
import {
    FormGroup,
    FormControl,
    Validators,
    AbstractControl,
    ValidationErrors,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
    loginPromptVisibility!: boolean;

    constructor(
        private userService: UserService,
        private router: Router,
        private fireAuth: AngularFireAuth,
        private fireStore: AngularFirestore
    ) {
        this.loginPromptVisibility = false;
    }

    passwordValidator = function (
        control: AbstractControl
    ): ValidationErrors | null {
        const value: string = control.value;

        // Check for at least one uppercase letter
        if (!/[A-Z]/.test(value)) {
            return { uppercaseLetterMissing: true };
        }

        // Check for at least one lowercase letter
        if (!/[a-z]/.test(value)) {
            return { lowercaseLetterMissing: true };
        }

        if (!/[0-9]/.test(value)) {
            return { numberMissing: true };
        }

        // Check for symbols (non-alphanumeric characters)
        if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\\-]/.test(value)) {
            return {
                symbolMissing: true,
            };
        }

        if (value.length < 8) {
            return { passwordTooShort: true };
        }

        return null;
    };

    signinForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        age: new FormControl('', [
            Validators.required,
            Validators.pattern('^[0-9]*$'),
        ]),
        password: new FormControl('', [
            Validators.required,
            this.passwordValidator.bind(this),
        ]),
        repeatPassword: new FormControl('', [
            Validators.required,
            this.matchingPasswordValidator.bind(this),
        ]),
    });

    matchingPasswordValidator(
        control: AbstractControl
    ): ValidationErrors | null {
        const password = this.signinForm?.get('password')?.value;
        const repeatPassword = control.value;

        if (password !== repeatPassword) {
            return { passwordsDoNotMatch: true };
        }

        return null;
    }

    onSignIn() {
        if (
            this.userService
                .getUsers()
                .some(
                    (user) =>
                        user.email === this.signinForm.get('email')?.value!
                )
        ) {
            this.loginPromptVisibility = true;
            return;
        } else {
            const newUser: User = {
                // name: this.signinForm.controls.name.value!,
                username:
                    this.signinForm?.get('name')?.value! +
                    this.signinForm?.get('lastName')?.value!,
                name: this.signinForm?.get('name')?.value!,
                lastname: this.signinForm.get('lastName')?.value!,
                email: this.signinForm.get('email')?.value!,
                age: parseInt(this.signinForm.get('age')?.value!),
                password: this.signinForm.get('password')?.value!,
                userOffers: [],
            };

            this.userService.addUser(newUser);
            this.router.navigate(['/home']);
        }
    }
}
