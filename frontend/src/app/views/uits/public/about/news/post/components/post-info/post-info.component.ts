import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Post} from "@app/shared/types/models/news";
import {ru} from "date-fns/locale";

@Component({
  selector: 'app-post-info',
  templateUrl: './post-info.component.html',
  styleUrls: ['./post-info.component.scss']
})
export class PostInfoComponent implements OnInit {

  @Input() post: BehaviorSubject<Post>;

  constructor() {
  }

  ngOnInit(): void {
  }

  protected readonly locale = ru;

  getDateFromString(dateISO: string): Date {
    return new Date(dateISO);
  }
}
