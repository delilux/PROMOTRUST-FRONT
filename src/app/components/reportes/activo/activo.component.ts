import { Component, OnInit } from '@angular/core';
import { UsuarioContratoActivoDTO } from '../../../models/UsuarioContratoActivoDTO';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UsuarioService } from '../../../services/usuario.service';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activo',
  standalone: true,
  imports: [MatTableModule, 
    MatButtonModule, 
    RouterLink,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    CommonModule],
  templateUrl: './activo.component.html',
  styleUrl: './activo.component.css'
})
export class ActivoComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'tipo_evento',
    'correo',
    'telefono',
    'detalle_contrato',
    'estadocontrato'
    

  ];
  dataSource: MatTableDataSource<UsuarioContratoActivoDTO> = new MatTableDataSource();
  constructor(private eS:UsuarioService) {}
  ngOnInit(): void {
    this.eS.getActivo().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);  
      
    });
  }

}
