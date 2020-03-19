import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private httpService: HttpService) {
  }

  public getbrief(): Promise<any> {
    this.httpService.setBaseUrl();
    return this.httpService.get(`brief`).toPromise();
  }

  public getLatest(iso2: string, iso3: string): Promise<any> {
    this.httpService.setBaseUrl();
    return this.httpService.get(`latest?iso2=${iso2}&iso3=${iso3}`).toPromise();
  }

  public getTimeSeries(iso2: string, iso3: string): Promise<any> {
    this.httpService.setBaseUrl();
    return this.httpService.get(`timeseries?iso2=${iso2}&iso3=${iso3}`).toPromise();
  }

  public getStatistics(): Promise<any> {
    this.httpService.setBaseUrl('Local');
    return this.httpService.get(`get-current-statistical`).toPromise();
  }

  public getImage(): Promise<any> {
    this.httpService.setBaseUrl('Rapid');
    return this.httpService.getRapidFile(`masks.php`).toPromise();
  }

  public getRapidData(): Promise<any> {
    this.httpService.setBaseUrl('Rapid');
    return this.httpService.getRapid(`worldstat.php`).toPromise();
  }
}
