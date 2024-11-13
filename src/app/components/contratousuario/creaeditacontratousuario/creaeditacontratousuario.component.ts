import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { ContratousuarioService } from '../../../services/contratousuario.service';
import { ContratoUsuario } from '../../../models/contratousuario';

@Component({
  selector: 'app-creaeditacontratousuario',
  standalone: true,
  imports: [MatTableModule,MatIconModule,RouterModule],
  templateUrl: './creaeditacontratousuario.component.html',
  styleUrl: './creaeditacontratousuario.component.css'
})
export class CreaeditacontratousuarioComponent {
  dataSource: MatTableDataSource<ContratoUsuario> = new MatTableDataSource();


  displayedColumns:string[]=['c1','c2','c3','c4','c5','eliminarcontratousuario','actualizarcontratousuario'];

  constructor(private conSU:ContratousuarioService, private snackBar: MatSnackBar){}
  ngOnInit(): void {
      this.conSU.list().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data)
      });
      this.conSU.getList().subscribe(data=>{
        this.dataSource=new MatTableDataSource(data);
      });
  }
  eliminar(id: number): void {
   this.conSU.delete(id).subscribe(
     () => {
       // Recargar la lista después de eliminar
       this.conSU.list().subscribe(data => {
         this.conSU.setList(data);
         this.snackBar.open('Elemento eliminado correctamente.', 'Cerrar', {
           duration: 3000,
         });
       });
     },
   );
 }

}

