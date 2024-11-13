import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ContratoService } from '../../../services/contrato.service';
import { Contrato } from '../../../models/contrato';

@Component({
  selector: 'app-listarcontrato',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: './listarcontrato.component.html',
  styleUrl: './listarcontrato.component.css'
})
export class ListarcontratoComponent implements OnInit {

  dataSource: MatTableDataSource<Contrato> = new MatTableDataSource();


  displayedColumns:string[]=['c1','c2','c3','eliminarcontrato','actualizarcontrato'];

  constructor(private conS:ContratoService, private snackBar: MatSnackBar){}
  ngOnInit(): void {
      this.conS.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      });
      this.conS.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
      });
  }
  eliminar(id: number): void {
   this.conS.delete(id).subscribe(
     () => {
       // Recargar la lista después de eliminar
       this.conS.list().subscribe(data => {
         this.conS.setList(data);
         this.snackBar.open('Elemento eliminado correctamente.', 'Cerrar', {
           duration: 3000,
         });
       });
     },
   );
 }

}
