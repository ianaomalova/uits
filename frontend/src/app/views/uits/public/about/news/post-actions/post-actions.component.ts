import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Post} from '@app/shared/types/models/news';

enum ActionType {
  ADD,
  EDIT,
  DELETE
}

type Action = {
  icon: string,
  type: ActionType
};

@Component({
  selector: 'post-actions',
  templateUrl: './post-actions.component.html',
  styleUrls: ['./post-actions.component.scss']
})
export class PostActionsComponent implements OnInit {

  @Input() post: Post;

  @Output() create: EventEmitter<Post['id']> = new EventEmitter<Post['id']>();

  @Output() edit: EventEmitter<Post['id']> = new EventEmitter<Post['id']>();

  @Output() delete: EventEmitter<Post['id']> = new EventEmitter<Post['id']>();

  actions: Action[] = [
    {
      icon: 'feather icon-plus-square',
      type: ActionType.ADD
    },
    {
      icon: 'feather icon-edit',
      type: ActionType.EDIT
    },
    {
      icon: 'feather icon-trash',
      type: ActionType.DELETE,
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  onCreate() {
    this.create.emit(this.post.id);
  }

  onEdit() {
    this.edit.emit(this.post.id);
  }

  onDelete() {
    this.delete.emit(this.post.id);
  }

  handleAction(type: ActionType) {
    switch (type) {
      case ActionType.ADD:
        this.onCreate();
        break;
      case ActionType.EDIT:
        this.onEdit();
        break;
      case ActionType.DELETE:
        this.onDelete();
        break;
    }
  }
}
