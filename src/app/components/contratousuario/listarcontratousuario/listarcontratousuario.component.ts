import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ContratoUsuario } from '../../../models/contratousuario';
import { ContratousuarioService } from '../../../services/contratousuario.service';

@Component({
  selector: 'app-listarcontratousuario',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listarcontratousuario.component.html',
  styleUrl: './listarcontratousuario.component.css',
})
export class ListarcontratousuarioComponent implements OnInit {
  dataSource: MatTableDataSource<ContratoUsuario> = new MatTableDataSource();

  displayedColumns: string[] = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'];

  constructor(private cuS: ContratousuarioService) {}
  ngOnInit(): void {
    this.cuS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}
