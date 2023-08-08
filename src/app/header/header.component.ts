import { Component } from '@angular/core';
import { VisibilityService } from '../services/visibility.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
    // constructor(private visibilityService: VisibilityService) {}
    // onLogInClick() {
    //     this.visibilityService.toggleHeaderVisibility();
    //     this.visibilityService.navigateTo('/login'); // Replace with the actual login path
    // }
    // onSignInClick() {
    //     this.visibilityService.toggleHeaderVisibility();
    //     this.visibilityService.navigateTo('/signin'); // Replace with the actual sign-in path
    // }
}
