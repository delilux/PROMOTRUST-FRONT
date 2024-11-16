import { Component } from '@angular/core';
 import { BaseChartDirective } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { ServiciosService } from '../../../services/servicios.service';
import { ServiciorCategoriaDTO } from '../../../models/ServiciorCategoriaDTO';
import { Chart, registerables } from 'chart.js';


Chart.register(...registerables);
@Component({
  selector: 'app-servicioxcategoria',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './servicioxcategoria.component.html',
  styleUrl: './servicioxcategoria.component.css'
})
export class ServicioxcategoriaComponent {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];
  constructor(private Ss: ServiciosService) {}

  ngOnInit(): void {
    this.Ss.ServiciosxCategoria().subscribe((data: ServiciorCategoriaDTO[]) => {
      this.barChartLabels = data.map((item) => `Servicio ${item.categoriaServic}`); // Ajuste en el campo
      this.barChartData = [
        {
          data: data.map((item) => item.totalPrecio),
          label: 'Distribucion por Categoria',
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
