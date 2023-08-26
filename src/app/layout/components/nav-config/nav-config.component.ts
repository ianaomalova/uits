import { Component, OnInit, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirection } from '@app/shared/types/modal-direction';

@Component({
    selector: 'nav-config',
    templateUrl: './nav-config.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class.header-nav-item]': 'true'
    }
})
export class NavConfigComponent implements OnInit {
    modalRef: BsModalRef;

    constructor(private modalService: BsModalService) {}
    
    ngOnInit () {

    }

    openQuickPanel(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show( template, Object.assign({}, { class: `${ModalDirection.Right}` }));
    }
}
