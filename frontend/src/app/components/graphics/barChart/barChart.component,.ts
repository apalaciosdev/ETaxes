import { Component, Input, OnInit } from '@angular/core';
import {Chart } from 'chart.js';


@Component({
  selector: 'barChartComponent',
  templateUrl: './barChart.component.html',
  providers: [], //Utilizamos el servicio aqui
  styleUrls: ['./barChart.component.css']
})



export class BarChartComponent implements OnInit{
  @Input() public data: any;
  public chart: any;

  ngOnInit(){
    console.log(this.data)
    this.createChart();
  }

  createChart(){
  
    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.data.map((producto: { title: any; }) => producto.title), 
	       datasets: [
          // {
          //   label: "Sales",
          //   data: ['467','576', '572', '79', '92',
					// 			 '574', '573', '576'],
          //   backgroundColor: 'blue'
          // },
          {
            label: "Stock",
            data: this.data.map((producto: { stock: any; }) => producto.stock),
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
