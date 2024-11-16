import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Servicios } from '../../../models/servicios';
import { CateogriaServiciosUsuriosDTO } from '../../../models/CateogriaServiciosUsuriosDTO';
import { ServiciosService } from '../../../services/servicios.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-categoriausuario',
  standalone: true,
  imports: [ MatTableModule, 
    MatButtonModule, 
    MatFormFieldModule,
    MatSelectModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './categoriausuario.component.html',
  styleUrl: './categoriausuario.component.css'
})
export class CategoriausuarioComponent  implements OnInit{
  categorias: Servicios [] = [];

  displayedColumns: string[] = [
    'nombre_Usuario',
    'categoria_Servicio',

  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<CateogriaServiciosUsuriosDTO> = new MatTableDataSource();
  form: FormGroup;

  constructor(
    private usuService: UsuarioService,
    private formBuilder: FormBuilder,
    private pS: ServiciosService,

  ) {
    this.form = this.formBuilder.group({
      categoria_servi: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initial data load if necessary
    this.pS.list().subscribe((data) => {
      this.categorias = data;
    });
  }

  getCategoriaxUsuario(): void {
    if (this.form.valid) {
      const categoria_servi = this.form.value.categoria_servi;
      console.log("entro al metodo", categoria_servi);
      this.usuService.getCategoria(categoria_servi).subscribe((data) => {
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
     
    
      });
    }
  }

}
