import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, registerables } from 'chart.js';
import { MetricasService } from '../../../services/metricas.service';
import { MetricaIngresoTotalDTO } from '../../../models/MetricaIngresoTotalDTO';
Chart.register(...registerables);

@Component({
  selector: 'app-contratoingresostotales',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './contratoingresostotales.component.html',
  styleUrl: './contratoingresostotales.component.css'
})
export class ContratoingresostotalesComponent{
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private mS: MetricasService) {}

  ngOnInit(): void {
    this.mS.obtenerIngresosTotal().subscribe((data: MetricaIngresoTotalDTO[]) => {
      this.barChartLabels = data.map((item) => `Contrato ${item.idcontrato}`); // Ajuste en el campo
      this.barChartData = [
        {
          data: data.map((item) => item.ingresostotales),
          label: 'Ingresos totales por contrato',
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



