import { Component } from '@angular/core';
import { VisibilityService } from './services/visibility.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    isHeaderVisible = true;

    constructor(private visibilityService: VisibilityService) {
        this.visibilityService
            .getHeaderVisibility()
            .subscribe((visible: boolean) => {
                this.isHeaderVisible = visible;
            });
    }
}
