import { Component, OnInit } from '@angular/core';
import {HomeService} from "@app/views/uits/public/home/home.service";
import {catchError, forkJoin, of} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    forkJoin({
      latestNews: this.homeService.getLatestNews().pipe(
        catchError(error => {
          console.error('Error fetching latest news', error);
          return of([]); // Возвращаем пустой массив в случае ошибки
        })
      ),
      latestAnnouncements: this.homeService.getLatestAnnouncements().pipe(
        catchError(error => {
          console.error('Error fetching latest announcements', error);
          return of([]); // Возвращаем пустой массив в случае ошибки
        })
      )
    }).subscribe()
  }

}
