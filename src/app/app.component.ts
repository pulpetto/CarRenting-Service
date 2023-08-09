import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { VisibilityService } from './services/visibility.service';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    isHeaderVisible: boolean = true;

    constructor(
        private visibilityService: VisibilityService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.visibilityService.getHeaderVisibility().subscribe((isVisible) => {
            this.isHeaderVisible = isVisible;
            console.log('Header is now visible', this.isHeaderVisible);
            console.log('Header is now visible', isVisible);
        });

        // Subscribe to NavigationEnd events to detect route changes
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .subscribe(() => {
                const routePath =
                    this.activatedRoute.snapshot.firstChild?.routeConfig?.path;

                if (routePath === 'login' || routePath === 'signin') {
                    this.visibilityService.setHeaderVisibility(false);
                    console.log('sttng to fls');
                } else {
                    this.visibilityService.setHeaderVisibility(true);
                    console.log('sttng to tr');
                }
            });
    }
}
