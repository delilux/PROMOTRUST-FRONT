import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { ContratoService } from '../../../services/contrato.service';
Chart.register(...registerables);

@Component({
  selector: 'app-cantidadmetricasestadocontrato',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './cantidadmetricasestadocontrato.component.html',
  styleUrl: './cantidadmetricasestadocontrato.component.css',
})
export class CantidadmetricasestadocontratoComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  //barChartType: ChartType = 'pie';
  //barChartType: ChartType = 'doughnut';
  //barChartType: ChartType = 'line';
  barChartType: ChartType = 'bar';
  //barChartType: ChartType = 'polarArea';

  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private conS: ContratoService) {}

  ngOnInit(): void {
    this.conS.obtenerCantidadMetricasEstado().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.estadocontrato);
      this.barChartData = [
        {
          data: data.map((item) => item.cantidadmetricas),
          label: 'Cantidad de Metricas por Estado de Contrato',
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
