import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';
import { Roles } from '../../../models/roles';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RolesService } from '../../../services/roles.service';
import { UsuarioService } from '../../../services/usuario.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-listar-roles',
  standalone: true,
  imports: [RouterOutlet,MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    RouterLink,
    MatInputModule,
    MatIconModule,
    MatButtonModule],
  templateUrl: './listar-roles.component.html',
  styleUrl: './listar-roles.component.css'
})
export class ListarRolesComponent implements OnInit {
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource();
  displayedColumns: string[] = [ 'codigo','username','tipo'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private rS: RolesService,
    private us: UsuarioService
  ) { }
  
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    this.rS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });

    
  }
 
  eliminar(id: number) {
    this.rS.eliminar(id).subscribe((data) => {
      this.rS.list().subscribe((data) => {
        this.rS.setList(data);
      });
    });
  }



}
