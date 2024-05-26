import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  constructor(private router: Router, private route: ActivatedRoute) {}

  getPaginationParams(): { limit: number, offset: number } {
    const offset = +this.route.snapshot.queryParamMap.get('offset');
    const limit = +this.route.snapshot.queryParamMap.get('limit');

    return { limit, offset };
  }

  setPaginationParams(limit: number, offset: number): Promise<boolean> {
    return this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { limit, offset },
      queryParamsHandling: 'merge'
    })
  }}
