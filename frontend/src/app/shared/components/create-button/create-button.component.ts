import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from "@app/shared/services/auth.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-create-button',
  templateUrl: './create-button.component.html',
  styleUrls: ['./create-button.component.css'],
  standalone: true,
  imports: [CommonModule,]
})
export class CreateButtonComponent implements OnInit {
  @Output() create: EventEmitter<any> = new EventEmitter<any>();
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

}
