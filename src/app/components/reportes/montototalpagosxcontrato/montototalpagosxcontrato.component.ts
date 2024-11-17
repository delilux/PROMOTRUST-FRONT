import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { PagoService } from '../../../services/pago.service';

@Component({
  selector: 'app-montototalpagosxcontrato',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './montototalpagosxcontrato.component.html',
  styleUrl: './montototalpagosxcontrato.component.css'
})
export class MontototalpagosxcontratoComponent implements OnInit {
  barChartOptions:ChartOptions= {
    responsive:true,
  };
  barChartLables:string[]=[];
  barChartType: ChartType='pie';
  barChartLegend=true;
  barChartData: ChartDataset[]=[];

  constructor(private cpS: PagoService) {}

  ngOnInit(): void {
    this.cpS.getobtenerMontoTotalPagosPorContrato().subscribe((data) => {
      this.barChartLables = data.map(item=>(item.detalle_contrato + "/"+ item.estadocontrato));
      this.barChartData=[
        {
          data:data.map(item=>item.total_monto_pagado),
          label:'Total vendido',
          backgroundColor:['#8064A2', '#4BACC6', '#4F81BC'],
          borderColor:'rgba(173,216,230,1)',
          borderWidth:1,
        }
      ]
    });
  }
}