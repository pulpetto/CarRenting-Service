import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root',
})
export class VisibilityService {
    private isHeaderVisible = new BehaviorSubject<boolean>(true);

    constructor(private router: Router) {}

    toggleHeaderVisibility() {
        this.isHeaderVisible.next(!this.isHeaderVisible.value);
    }

    navigateTo(path: string) {
        this.router.navigate([path]);
    }

    getHeaderVisibility(): Observable<boolean> {
        return this.isHeaderVisible.asObservable();
    }
}
