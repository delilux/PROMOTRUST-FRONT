import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Metricas } from '../../../models/metricas';
import { MetricasService } from '../../../services/metricas.service';

@Component({
  selector: 'app-listarmetricas',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarmetricas.component.html',
  styleUrl: './listarmetricas.component.css'
})
export class ListarmetricasComponent implements OnInit {
  dataSource: MatTableDataSource<Metricas> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c3', 'c4', 'c5', 'c6', 'c7'];

  constructor(private mS: MetricasService) {}

  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }

}
