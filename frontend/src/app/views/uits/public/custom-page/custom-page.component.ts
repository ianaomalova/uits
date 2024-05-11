import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-custom-page',
  templateUrl: './custom-page.component.html',
  styleUrls: ['./custom-page.component.scss']
})
export class CustomPageComponent implements OnInit {
  slug$: BehaviorSubject<string>;

  constructor(private route: ActivatedRoute ) {
    this.slug$ = new BehaviorSubject(null);
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.slug$.next(params['slug']);
    })
  }

}
