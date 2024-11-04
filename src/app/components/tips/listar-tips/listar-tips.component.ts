import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Tips } from '../../../models/Tips';
import { RouterModule } from '@angular/router';
import { TipsService } from '../../../services/tips.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-tips',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: './listar-tips.component.html',
  styleUrl: './listar-tips.component.css'
})
export class ListarTipsComponent implements OnInit {

  dataSource: MatTableDataSource<Tips> = new MatTableDataSource();


   displayedColumns:string[]=['c1','c2','c3','elimi','accion02'];

   constructor(private tS:TipsService, private snackBar: MatSnackBar){}
   ngOnInit(): void {
       this.tS.list().subscribe(data=>{
         this.dataSource=new MatTableDataSource(data)
       });
       this.tS.getList().subscribe(data=>{
         this.dataSource=new MatTableDataSource(data);
       });
   }
   eliminar(id: number): void {
    this.tS.delete(id).subscribe(
      () => {
        // Recargar la lista después de eliminar
        this.tS.list().subscribe(data => {
          this.tS.setList(data);
          this.snackBar.open('Elemento eliminado correctamente.', 'Cerrar', {
            duration: 3000,
          });
        });
      },
      error => {
        // Manejar el error de clave foránea
        if (error.status === 409) { // Ajusta el código de error si es necesario
          this.snackBar.open('Elimine el dato foráneo antes de eliminar este registro.', 'Cerrar', {
            duration: 5000,
          });
        } else {
          this.snackBar.open('Debes eliminar el usuario .', 'Cerrar', {
            duration: 3000,
          });
        }
      }
    );
  }
   
    


  }
  
 

