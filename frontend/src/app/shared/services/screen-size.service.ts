import { Injectable, HostListener, ElementRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SCREEN_SIZE } from '../types/screen-size.enum';

@Injectable()
export class ScreenSizeService {

    constructor(private elementRef: ElementRef) {
        this.resizeSubject = new Subject();
    }

    private sizes = [
        {
            id: SCREEN_SIZE.XS, name: 'xs', size: 0
        },
        {
            id: SCREEN_SIZE.SM, name: 'sm', size: 576
        },
        {
            id: SCREEN_SIZE.MD, name: 'md', size: 768
        },
        {
            id: SCREEN_SIZE.LG, name: 'lg', size: 992
        },
        {
            id: SCREEN_SIZE.XL, name: 'xl', size: 1200
        },
        {
            id: SCREEN_SIZE.XXL, name: 'xxl', size: 1440
        }
    ]

    get onResize$(): Observable<number[]> {
        return this.resizeSubject.asObservable().pipe(distinctUntilChanged());
    }

    private resizeSubject: Subject<number[]>;

    onResize(size: number) {
        const currentSize = this.sizes.filter(elm => {
            return elm.size <= size
        });
        const sizeArr: number[] = []
        for (let i = 0; i < currentSize.length; i++) {
            sizeArr.push(currentSize[i].id)
        }
        this.resizeSubject.next(sizeArr);
    }
}