import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { Metricas } from '../../../models/metricas';
import { MetricasService } from '../../../services/metricas.service';

@Component({
  selector: 'app-creaeditametrica',
  standalone: true,
  imports: [MatTableModule, MatIconModule, RouterModule],
  templateUrl: './creaeditametrica.component.html',
  styleUrl: './creaeditametrica.component.css',
})
export class CreaeditametricaComponent {
  dataSource: MatTableDataSource<Metricas> = new MatTableDataSource();

  displayedColumns: string[] = [
    'c1',
    'c2',
    'c3',
    'c4',
    'c5',
    'c6',
    'c7',
    'eliminarmetrica',
    'actualizarmetrica',
  ];

  constructor(private mS: MetricasService, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.mS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.mS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  eliminar(id: number): void {
    this.mS.delete(id).subscribe(() => {
      // Recargar la lista después de eliminar
      this.mS.list().subscribe((data) => {
        this.mS.setList(data);
        this.snackBar.open('Elemento eliminado correctamente.', 'Cerrar', {
          duration: 3000,
        });
      });
    });
  }
}
