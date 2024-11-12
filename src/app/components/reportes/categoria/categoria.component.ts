import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UsuarioService } from '../../../services/usuario.service';
@Component({
  selector: 'app-categoria',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent  implements OnInit{
  barChartOptions:ChartOptions= {
    responsive:true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private hS:UsuarioService){}

  ngOnInit(): void {
      this.hS.getCategoria().subscribe((data) => {
        this.barChartLabels = data.map((item) => item.Categoria_Servicio);
        this.barChartData = [
          {
            data:data.map((item) => Number(item.Nombre_Usuario)),
            label: 'rutas',
            backgroundColor: [
              '#009g88',
              '#4169c7',
              '#C0504D',
              '#4169E9',
              '#0000CD',
              '#9BBB59',
              '#8064A2',
              '#4BACC6',
              '#4F81BC',
            ],
            borderColor: 'rgba(173, 216, 230, 1)',
            borderWidth: 1,
          },
        ];
      });
    


    }}
