import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { 
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { Incidencias } from '../../../models/incidencias';
import { IncidenciasService } from '../../../services/incidencias.service';
import { CommonModule } from '@angular/common';

 

@Component({
  selector: 'app-creaeditaincidencias',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    CommonModule, ],
    
  templateUrl: './creaeditaincidencias.component.html',
  styleUrl: './creaeditaincidencias.component.css'
})
export class CreaeditaincidenciasComponent implements OnInit{
  form:FormGroup=new  FormGroup({});
  incidencia: Incidencias = new Incidencias();
  id: number = 0;
  edicion: boolean = false;

listaUbicaciones:{value:string,viewValue:string}[]=[
  {value:'Sotano',viewValue:'Sotano'},
  {value:'Piso1',viewValue:'Piso1'},
  {value:'Piso2',viewValue:'Piso2'},
  {value:'Terraza',viewValue:'Terraza'}
];
constructor(
  private rs:IncidenciasService,
  private formBuilder:FormBuilder,
  private router:Router,
  private route: ActivatedRoute

){}
ngOnInit(): void {
  this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.edicion = data['id'] != null;
    this.init();
  });

  this.form = this.formBuilder.group({
    descripcionIncidencias: ['', Validators.required], // Campo para la descripción
    fechaIncidencia: ['', Validators.required], // Campo para la fecha de la incidencia
    idContrato: ['', Validators.required] // Asegúrate de agregar todos los campos que necesites
  });
}


 aceptar(): void {
    if (this.form.valid) {
      // Asigna los valores del formulario a la incidencia
      this.incidencia.descripcionIncidencias = this.form.value.descripcionIncidencias;
      this.incidencia.fecha_Incidencia = this.form.value.fechaIncidencia;
      this.incidencia.contrato.id = this.form.value.idContrato;

      // Inserta la incidencia
      this.rs.insert(this.incidencia).subscribe(() => {
        this.router.navigate(['incidencias']); // Redirige a la lista de incidencias
      });
    }
  }
 init() {
    if (this.edicion) {
      this.rs.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.id),
          hambiente: new FormControl(data.contrato),
          hubicacion: new FormControl(data.descripcionIncidencias),
          hdate: new FormControl(data.fecha_Incidencia),
        });
      });
    }
  }
}