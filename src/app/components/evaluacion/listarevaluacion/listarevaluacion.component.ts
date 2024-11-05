import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon'
import { RouterModule } from '@angular/router';
import { Evaluacion } from '../../../models/evaluacion';
import { EvaluacionService } from '../../../services/evaluacion.service';

@Component({
  selector: 'app-listarevaluacion',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: './listarevaluacion.component.html',
  styleUrl: './listarevaluacion.component.css'
})
export class ListarevaluacionComponent implements OnInit {
  dataSource: MatTableDataSource<Evaluacion> = new MatTableDataSource();
  
  displayedColumns: string[] = ['cd1', 'cd2', 'cd3','cd4', 
    'cd5' ,'accion01','accion02'];
  
  
  constructor(private ds: EvaluacionService) {}
  ngOnInit(): void {
  
    this.ds.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.ds.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
  
  eliminar(id: number) {
    this.ds.delete(id).subscribe((data)=>{
      this.ds.list().subscribe((data)=>{
        this.ds.setList(data);
        });
      });
    }


}
