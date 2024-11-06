import { Component ,OnInit} from '@angular/core';
import{MatTableDataSource,MatTableModule} from '@angular/material/table'
import { Preguntas } from '../../../models/preguntas';
import { PreguntasService } from '../../../services/preguntas.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-listarpreguntas',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: 'listar-preguntas.component.html',
  styleUrl: 'listar-preguntas.component.css',
})
export class ListarPreguntasComponent implements OnInit {
  dataSource: MatTableDataSource<Preguntas> = new MatTableDataSource();


displayedColumns:string[]=['c1','c2','c3','accion01','accion02'];

  constructor(private rS : PreguntasService){}
  ngOnInit(): void {
    this.rS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.rS.getList().subscribe((data) => {
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