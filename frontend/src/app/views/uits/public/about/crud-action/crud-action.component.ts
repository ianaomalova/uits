import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface Identifiable {
  id: number;
}
enum ActionType {
  EDIT,
  DELETE
}

type Action = {
  icon: string,
  type: ActionType
};
@Component({
  selector: 'app-crud-action',
  templateUrl: './crud-action.component.html',
  styleUrls: ['./crud-action.component.scss']
})
export class CrudActionComponent<T extends Identifiable> implements OnInit {
  @Input() item: T;

  @Output() edit: EventEmitter<number> = new EventEmitter<number>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  actions: Action[] = [
    {
      icon: 'feather icon-edit',
      type: ActionType.EDIT
    },
    {
      icon: 'feather icon-trash',
      type: ActionType.DELETE,
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

  onEdit() {
    this.edit.emit(this.item.id);
  }

  onDelete() {
    this.delete.emit(this.item.id);
  }

  handleAction(type: ActionType) {
    switch (type) {
      case ActionType.EDIT:
        this.onEdit();
        break;
      case ActionType.DELETE:
        this.onDelete();
        break;
    }
  }

}
