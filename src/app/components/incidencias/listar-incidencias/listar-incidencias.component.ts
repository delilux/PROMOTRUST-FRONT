import { Component ,OnInit} from '@angular/core';
import{MatTableDataSource,MatTableModule} from '@angular/material/table'
import { incidencias } from '../../../models/incidencias';
import { IncidenciasService } from '../../../services/incidencias.service';
@Component({
  selector: 'app-listar-incidencias',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listar-incidencias.component.html',
  styleUrl: './listar-incidencias.component.css'
})
export class ListarIncidenciasComponent  implements OnInit{
  ataSource:MatTableDataSource<incidencias>=new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3']
  
  constructor(private rs : IncidenciasService){}
  ngOnInit(): void {
  this.rs.list().subscribe((data)=> {
    this.dataSource=new MatTableDataSource(data)
  });
  
}
  
}
