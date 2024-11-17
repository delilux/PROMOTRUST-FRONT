import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MetodopagoService } from '../../../services/metodopago.service';

@Component({
  selector: 'app-pagosxmetodopago',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pagosxmetodopago.component.html',
  styleUrl: './pagosxmetodopago.component.css'
})
export class PagosxmetodopagoComponent implements OnInit {
  barChartOptions:ChartOptions= {
    responsive:true,
  };
  barChartLables:string[]=[];
  barChartType: ChartType='pie';
  barChartLegend=true;
  barChartData: ChartDataset[]=[];

  constructor(private cpS: MetodopagoService) {}

  ngOnInit(): void {
    this.cpS.getobtenerMontoTotalPagosPorContrato().subscribe((data) => {
      this.barChartLables = data.map(item=>(item.tipo_metodo_pago + "/"+ item.total_pagos));
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