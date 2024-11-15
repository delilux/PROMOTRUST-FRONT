import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { Chart, registerables } from 'chart.js';
import { IncidenciasService } from '../../../services/incidencias.service';
import { IncidenciasControllerDTO } from '../../../models/IncidenciasControllerDTO';
Chart.register(...registerables);

@Component({
  selector: 'app-incidenciascontrato',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './incidenciascontrato.component.html',
  styleUrl: './incidenciascontrato.component.css',
})
export class IncidenciascontratoComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private iS: IncidenciasService) {}

  ngOnInit(): void {
    this.iS
      .IncidenciasporContrato()
      .subscribe((data: IncidenciasControllerDTO[]) => {
        this.barChartLabels = data.map(
          (item) => `Contrato ${item.nombre_Contrato}`
        ); // Ajuste en el campo
        this.barChartData = [
          {
            data: data.map((item) => item.cantidad_incidencaias),
            label: 'Incidencias por Contrato',
            backgroundColor: [
              '#3C1361', // Dark Purple
              '#5A189A', // Purple
              '#7B2CBF', // Medium Purple
              '#9D4EDD', // Vivid Purple
              '#C77DFF', // Light Purple
              '#E0AAFF', // Light Lavender
              '#D0B3FF', // Lavender
              '#B48AFF', // Soft Violet
              '#A171FF', // Lilac
              '#CDB4DB', // Light Lilac
            ],
            borderColor: 'rgba(173, 216, 230, 1)',
            borderWidth: 1,
          },
        ];
      });
  }
}
