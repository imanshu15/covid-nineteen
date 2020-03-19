import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

// core components
import {
  chartOptions,
  parseOptions,
  chart1,
  chart2
} from '../../variables/charts';
import { DataService } from 'src/app/services/data.service';
import { DataModel, BriefModel, TimeSeries, LocalData } from 'src/app/models/data-models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private dataModel: DataModel;

  thumbnail: any;
  public lineChartObj;
  public pieChart: any;
  public lineChart: any;
  private chartLabels: string[] = [];
  private chartValues: number[] = [];
  private hospitalData: any[] = [];

  constructor(private dataService: DataService, private sanitizer: DomSanitizer) {
    this.dataModel = new DataModel();
  }

  ngOnInit() {

    this.loadData();
    parseOptions(Chart, chartOptions());


    this.lineChart = document.getElementById('chart-1');
    this.lineChartObj = new Chart(this.lineChart, {	type: 'line',	options: chart1.options,	data: chart1.data});
  }

  private loadData() {
    this.dataService.getbrief().then(a => {
      if (a) {
        this.dataModel.globalBrief = a;
      }
    });

    this.dataService.getLatest('LK', 'LKA').then(a => {
      if (a) {
        this.dataModel.localBrief = a[0];
      }
    });

    this.dataService.getTimeSeries('LK', 'LKA').then(a => {
      this.dataModel.timeSeries = [];
      const jsonData = a[0].timeseries;
      let index = 0;
      // tslint:disable-next-line: forin
      for (const i in jsonData) {
        // tslint:disable-next-line: one-variable-per-declaration
        if (index >= 39) {
          const date = i.split('/');
          // tslint:disable-next-line: max-line-length
          const newDate = (date[0].length === 1 ? '0' + date[0] : date[0]) + '/'  + (date[1].length === 1 ? '0' + date[1] : date[1]) + '/' + '20' + date[2];
          const temp = new TimeSeries();
          temp.date = new Date(newDate);
          temp.brief = jsonData[i];
          this.dataModel.timeSeries.push(temp);

          this.chartLabels.push(i);
          this.chartValues.push(temp.brief.confirmed);
        }
        index++;
      }

      this.dataModel.timeSeries = this.dataModel.timeSeries;

      this.loadLineCharts();
    });

    this.dataService.getStatistics().then(a => {
      if (a && a.success) {
        this.dataModel.localData = a.data;
        this.hospitalData = a.data.hospital_data;
        // tslint:disable-next-line: max-line-length
        this.dataModel.localData.recoveredPercentage = (this.dataModel.localData.local_recovered / this.dataModel.localData.local_total_cases ) * 100;
      }
      console.log(this.dataModel.localData);
      this.loadPieCharts();
    });

    this.dataService.getRapidData().then(a => {
      if (a) {
        this.dataModel.rapidBrief = a;
        // tslint:disable-next-line: max-line-length
        this.dataModel.rapidBrief.recoveredPercentage = (+this.dataModel.rapidBrief.total_recovered.replace(',', '') / +this.dataModel.rapidBrief.total_cases.replace(',', '')) * 100;
      }
    });

    this.dataService.getImage().then(a => {
      const reader = new FileReader();
      reader.readAsDataURL(a);
      // tslint:disable-next-line: only-arrow-functions
      reader.onloadend = function() {
         const objectURL = reader.result;
         this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      }.bind(this);

      console.log('Image', a);
    });
  }

  public loadLineCharts() {
    const chart1Data = {
      labels: this.chartLabels,
      datasets: [{
        label: 'Confirmed',
        data: this.chartValues
      }]
    };

    this.lineChartObj = new Chart(this.lineChart, {	type: 'line',	options: chart1.options,	data: chart1Data});

    }

    public loadPieCharts() {
    const data: number[] = [];
    data.push(this.dataModel.localData.local_total_cases);
    data.push(this.dataModel.localData.local_deaths);
    data.push(this.dataModel.localData.local_recovered);

    this.pieChart = new Chart('chart-2', {
          type: 'pie',
          data: {
            labels: ['Cases', 'Deaths', 'Recovered'],
            datasets: [
              {
                data,
                backgroundColor: ['rgba(245, 54, 92)', 'rgba(251, 99, 64)', 'rgba(	255, 214, 0)'],
                fill: false
              },
            ]
          },
          options: {
            legend: {
              display: true
            },
            tooltips: {
              enabled: true
            }
          }
        });
    }
}
