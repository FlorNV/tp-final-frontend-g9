import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartDataset, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { OficinaService } from 'src/app/services/oficina.service';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  constructor(private oficinaService: OficinaService) { 
  }
  oficinas:Array<any>=[];
  valores:Array<any>=[];
  date=new Date()
  dates:Array<string>=[]
  range=3
  ngOnInit(): void {
    this.getEstadisticasOficinas();
  }
  getEstadisticasOficinas(){
    this.oficinaService.getEstadisticasOficinas().subscribe({
      next:(result)=>{
        this.oficinas=[];
        this.oficinas=result['data']['oficinas'];
        console.log(this.oficinas);
        this.generateValues()
        this.update()
      },
      error: () => {
        alert('Error en la peticion');
      },
    })
  }
  generateValues(){
    this.oficinas.forEach(x=>this.valores.push({data:Object.values(x["historialDeReuniones"]), label:x["nombre"]}))
    console.log(this.valores)
  }
  generateDates(){
    for(let i=0;i<this.range;i++){
      this.dates.push(this.date.getFullYear() + "-" +(this.date.getMonth()+i))
    }
  }
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0,
        max:10
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: [ '2022-07', '2022-08', '2022-09' ],
    datasets: this.valores
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public update(): void {
    // Only Change 3 values
    this.valores=[]
    this.generateValues()

    this.chart?.update();
  }
}
