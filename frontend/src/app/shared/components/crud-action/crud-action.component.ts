import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Permission} from "@app/shared/types/permission.enum";
import {AuthService} from "@app/shared/services/auth.service";

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
  disabled: boolean;
  @Input() item: T;
  @Input() permission: Permission = Permission.USERS;
  @Output() edit: EventEmitter<number> = new EventEmitter<number>();
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();

  @Input() actions: Action[] = [
    {
      icon: 'feather icon-edit',
      type: ActionType.EDIT
    },
    {
      icon: 'feather icon-trash',
      type: ActionType.DELETE,
    }
  ];

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    switch (this.permission) {
      case Permission.USERS:
        if (this.authService.profile$.getValue().isAnonymous) {
          this.disableActions();
        }
        break;
      case Permission.MODERATOR:
        const profile = this.authService.profile$.getValue();
        if (!(profile.isModerator || profile.isSuperuser)) {
          this.disableActions();
        }
        break;
    }
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

  disableActions() {
    this.disabled = true;
  }
}
