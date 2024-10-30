import { Component ,OnInit} from '@angular/core';
import{MatTableDataSource,MatTableModule} from '@angular/material/table'
import { Preguntas } from '../../../models/preguntas';
import { PreguntasService } from '../../../services/preguntas.service';

@Component({
  selector: 'app-listar-preguntas',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './listar-preguntas.component.html',
  styleUrl: './listar-preguntas.component.css'
})
export class ListarPreguntasComponent implements OnInit{
  dataSource:MatTableDataSource<Preguntas>=new MatTableDataSource();

  displayedColumns:string[]=['c1','c2','c3']
  
  constructor(private rs : PreguntasService){}
  ngOnInit(): void {
  this.rs.list().subscribe((data)=> {
    this.dataSource=new MatTableDataSource(data)
  });
  
    
  } 
  
}
