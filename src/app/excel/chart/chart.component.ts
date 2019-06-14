import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { StoreService } from '../../p-common/store.service';
import { SprintsService } from '../../sprints/sprints.service';
import { ProjectDto } from '../../declarations/models/project-dto';
import { Router } from '@angular/router';
import { CoefficientGraphPointDto } from '../../declarations/models/coefficient-graph-point-dto';
import { MessageService } from 'primeng/api';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.css' ]
})
export class ChartComponent implements OnDestroy, OnInit {

  chartData: ChartPoint[];

  isLoaded = false;

  private chart: am4charts.XYChart;

  get currentProject(): ProjectDto {
    return this.store.getCurrentProject();
  }

  constructor(private zone: NgZone,
              private store: StoreService,
              private sprintsService: SprintsService,
              private router: Router,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    if (!this.currentProject) {
      this.router.navigate([ 'projects' ]);
      return;
    }

    this.sprintsService.getChartData(this.currentProject.id).subscribe(chartData => {
      this.chartData = this.prepareData(chartData.points);
      this.isLoaded = true;
      this.setUpChart();
    }, () => this.messageService.add({
      severity: 'error',
      summary: 'Wystąpił błąd',
      detail: 'Wystąpił błąd podczas ładowania danych do wykresu'
    }));
  }

  setUpChart() {
    this.zone.runOutsideAngular(() => {
      const chart = am4core.create('chartdiv', am4charts.XYChart);
      chart.paddingRight = 40;
      chart.data = this.chartData;

      const dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.dateFormats.setKey('hour', 'MMM dd HH:mm');
      dateAxis.dateFormats.setKey('minute', 'MMM dd HH:mm');
      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      const coefficientSeries = chart.series.push(new am4charts.LineSeries());
      coefficientSeries.dataFields.dateX = 'date';
      coefficientSeries.dataFields.valueY = 'coefficientY';
      coefficientSeries.name = 'Współczynnik';

      const averageCoefficientSeries = chart.series.push(new am4charts.LineSeries());
      averageCoefficientSeries.dataFields.dateX = 'date';
      averageCoefficientSeries.dataFields.valueY = 'averageCoefficientY';
      averageCoefficientSeries.name = 'Średni współczynnik';

      coefficientSeries.tooltipText = '{valueY.value}';
      chart.cursor = new am4charts.XYCursor();

      const bullet = coefficientSeries.bullets.push(new am4charts.CircleBullet());
      bullet.circle.strokeWidth = 2;
      bullet.circle.radius = 4;
      bullet.circle.fill = am4core.color('#fff');

      const scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(coefficientSeries);
      scrollbarX.series.push(averageCoefficientSeries);
      chart.scrollbarX = scrollbarX;

      chart.cursor = new am4charts.XYCursor();
      chart.cursor.behavior = 'panXY';
      chart.cursor.xAxis = dateAxis;
      chart.cursor.snapToSeries = coefficientSeries;

      chart.legend = new am4charts.Legend();
      this.chart = chart;
    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  prepareData(data: CoefficientGraphPointDto[]) {
    return data.map(this.convertToChartPoint);
  }

  convertToChartPoint(point: CoefficientGraphPointDto) {
    return {
      date: new Date(point.time * 1000),
      coefficientY: point.averageCoefficient,
      averageCoefficientY: point.coefficient,
    };
  }
}

interface ChartPoint {
  date: Date;
  coefficientY: number;
  averageCoefficientY: number;
}
