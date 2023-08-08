import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { VisibilityService } from './services/visibility.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    isHeaderVisible = true;

    constructor(
        private visibilityService: VisibilityService,
        private router: Router
    ) {
        // this.visibilityService
        //     .getHeaderVisibility()
        //     .subscribe((visible: boolean) => {
        //         this.isHeaderVisible = visible;
        //     });
        router.events.subscribe((val) => {
            console.log(val instanceof NavigationEnd);
        });

        if (router.url === 'login' || router.url === 'signin') {
            // this.visibilityService.toggleHeaderVisibility(false);
            this.isHeaderVisible = false;
            console.log('f');
        } else {
            // this.visibilityService.toggleHeaderVisibility(true);
            this.isHeaderVisible = true;
            console.log('t');
        }
    }
}
