import { Component, OnInit ,ViewChild} from '@angular/core';
import { ShowHideDirective } from '@angular/flex-layout';
import ApexCharts from 'apexcharts';
import { colors } from 'app/colors.const';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis:ApexYAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
[x: string]: any;
  public value = 0;
  public running: number;
  public revenueReportChartoptions;


  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  @ViewChild("chart1") chart1: ChartComponent;
  chartOptions1: any;
  @ViewChild("char3") chart3: ChartComponent;
  chartOptions3: any;
  @ViewChild("chart4") chart4: ChartComponent;
  chartOptions4: any;
   constructor() {

  
      this.chartOptions1 = {
        series: [44, 55, 13, 43],
        chart: {
          type: "donut",
        },
        labels: ["Team A", "Team B", "Team C", "Team D"],
        fill: { colors: ['#F44336', '#E91E63', '#9C27B0'] },
        responsive: [
          {
            breakpoint: 480,
            options: {
              
              chart: {
                width: 800,
                height:500,
              },
             
              
            }
          }
        ]
      };
    
    this.chartOptions = {
      series: [
        {
          name: "Series-1",
          data: [0, 20, 5, 30, 15, 45],
        }
      ],
      chart: {
        height: 150,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight",
      },
      title: {
        // text: "Product Trends by Month",
        align: "left"
      },
      grid: {
        row: {
          colors: ["white", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.7
        }
      },
      yaxis:{
        show:false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
        ]
      }
      
    };
    this.chartOptions3 = {
      series: [
        {
          name: "Earning",
          data: [100, 200, 300, 400, 250, 150, 200, 250, 50]
        },
        {
          name: "Expense",
          data: [-150, -100, -50, -200, -150, -100, -50, -100, -150]
        }
      ],
      chart: {
        type: "bar",
        height: 410,
        stacked: true
      },
      colors: ["#887ff2", "#ffae61"],
      plotOptions: {
        bar: {
          horizontal: false,
          barHeight: "60%"
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 10,
        colors: ["#fff"]
      },

      grid: {
        xaxis: {
          lines: {
            show: false
          }
        }
      },
      yaxis: {
        min: -300,
        max: 400,
        title: {
          // text: 'Age',
        }
      },
      tooltip: {
        shared: false,
        x: {
          formatter: function (val) {
            return val.toString();
          }
        },
        y: {
          formatter: function (val) {
            return Math.abs(val) + "%";
          }
        }
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "March",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
         
        ],
        title: {
          text: ""
        },
      }
    };
    this.chartOptions4 = {
      series: [
        {
          name: "Series-1",
          data: [30, 20, 5, 30, 15, 45],
        }
      ],
      chart: {
        height: 150,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth",
      },
      title: {
        // text: "Product Trends by Month",
        align: "left"
      },
      grid: {
        row: {
          colors: ["white", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.7
        }
      },
      yaxis:{
        show:false,
      },
      xaxis: {
        labels: {
          show: false,
        },
        categories: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
        ]
      }
      
    };
    this.chartOptions5 = {
      series: [83],
      chart: {
        type: "radialBar",
        offsetY: -10
      },
      plotOptions: {
        
        radialBar: {
          startAngle: -150,
          endAngle: 150,
          hollow: {
            margin: 0,
            size: "80%",
            background: "#fff",
            image: undefined,
            position: "front",
           
          },
          track: {
            background: "#eeedf3",
            strokeWidth: "50%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: false,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2
            }
          },
          dataLabels: {
            name: {
              show: false
            },
            value: {
              offsetY: -2,
              fontSize: "22px"
            }
          }
        }
      },
      colors: ['#7ce09d'],
      labels: ["Average Results"]
    };
  
  }
  

  ngOnInit(): void {
    }

}
