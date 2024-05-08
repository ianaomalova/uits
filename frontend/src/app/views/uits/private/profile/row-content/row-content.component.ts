import { Component, OnInit, Input, TemplateRef } from '@angular/core';

@Component({
    selector: 'row-content',
    templateUrl: './row-content.component.html'
})
export class RowContentComponent implements OnInit {

    @Input() title: string;
    @Input() description: string;
    @Input() border: boolean = true
    @Input() icon: string;
    @Input() img: string;
    @Input() handler: TemplateRef<any>;

    constructor() { }

    ngOnInit(): void { }
}
