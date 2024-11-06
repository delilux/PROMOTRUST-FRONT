import { Component ,OnInit} from '@angular/core';
import{MatTableDataSource,MatTableModule} from '@angular/material/table'
import { Incidencias } from '../../../models/incidencias';
import { IncidenciasService } from '../../../services/incidencias.service';
import { RouterModule } from '@angular/router'; 
import { MatIconModule } from '@angular/material/icon'; // <-- Importación necesaria

@Component({
  selector: 'app-listar-incidencias',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule], 
   templateUrl: './listar-incidencias.component.html',
  styleUrl: './listar-incidencias.component.css'
})
export class ListarIncidenciasComponent  implements OnInit{
  dataSource:MatTableDataSource<Incidencias>=new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3','c4','accion01','accion02']
  
  constructor(private rS : IncidenciasService){}
  ngOnInit(): void {
  this.rS.list().subscribe((data)=> {
    this.dataSource=new MatTableDataSource(data)
  });
  this.rS.getList().subscribe(data=>{
    this.dataSource = new MatTableDataSource(data);
  });
  
}
eliminar(id: number) {
  this.rS.delete(id).subscribe((data)=>{
    this.rS.list().subscribe((data)=>{
      this.rS.setList(data);
      });
    });
  }

}
