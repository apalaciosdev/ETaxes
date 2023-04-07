import { Component, Input, OnInit } from '@angular/core';
import {Chart } from 'chart.js';


@Component({
  selector: 'barChartSalesComponent',
  templateUrl: './barChartSales.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./barChartSales.component.css']
})



export class BarChartSalesComponent implements OnInit{
  @Input() public data: any;
  public chart: any;

  ngOnInit(){
    console.log(this.data)
    this.createChart();
  }

  createChart(){
  
    this.chart = new Chart("MyChart2", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.data.map((producto: { month: any; }) => producto.month), 
	       datasets: [
          // {
          //   label: "Sales",
          //   data: ['467','576', '572', '79', '92',
					// 			 '574', '573', '576'],
          //   backgroundColor: 'blue'
          // },
          {
            label: "Ingresos",
            data: this.data.map((producto: { total: any; }) => producto.total),
            backgroundColor: '#41BC91'
          }  
        ]
      },
      options: {
        aspectRatio: 2.5,
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          y: {
            stacked: true,
            grid: {
              display: true,
              color: "rgba(255,99,132,0.2)"
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }
      
    });
  }

  

}
