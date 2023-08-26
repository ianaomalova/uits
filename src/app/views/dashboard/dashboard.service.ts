import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { 
    ChartSeries, 
    RegionData, 
    OverviewData, 
    RecentTransactionData,
    RecentReviewData,
    DeviceStatisticData,
    CountriesData
} from './dashboard.type';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    apiUrl = `/api/dashboard`;
 
    constructor(private http: HttpClient) {}

    getMonthlyRevenueChartData() {
        return this.http.get<Array<ChartSeries>>(`${this.apiUrl}/monthly-revenue`)
    }

    getRegionMapData() {
        return this.http.get<Array<RegionData>>(`${this.apiUrl}/region-data`)
    }

    getOverviewData() {
        return this.http.get<OverviewData>(`${this.apiUrl}/overview`)
    }

    getRecentTransactionData() {
        return this.http.get<Array<RecentTransactionData>>(`${this.apiUrl}/recent-transaction`)
    }

    getRecentRatingData() {
        return this.http.get<Array<RecentReviewData>>(`${this.apiUrl}/recent-rating`)
    }

    getDeviceSatisticData() {
        return this.http.get<Array<DeviceStatisticData>>(`${this.apiUrl}/device`)
    }

    getCountriesData() {
        return this.http.get<Array<CountriesData>>(`${this.apiUrl}/countries`)
    }
}