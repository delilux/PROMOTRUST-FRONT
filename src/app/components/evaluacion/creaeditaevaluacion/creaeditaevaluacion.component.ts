import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule,NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

import { Contrato } from '../../../models/contrato';
import { ContratoUsuario } from '../../../models/contratousuario';
import { Evaluacion } from '../../../models/evaluacion';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { ContratousuarioService } from '../../../services/contratousuario.service';
@Component({
  selector: 'app-creaeditaevaluacion',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    
    MatDatepickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatIconModule,NgIf,
  ],
  templateUrl: './creaeditaevaluacion.component.html',
  styleUrl: './creaeditaevaluacion.component.css'
})
export class CreaeditaevaluacionComponent implements OnInit  {
  form: FormGroup = new FormGroup({});
  evaluacion: Evaluacion = new Evaluacion();
  id: number = 0;
  edicion: boolean = false;

  listaContratosUsuario:ContratoUsuario[]=[];

  constructor(
    private es: EvaluacionService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private  cs:ContratousuarioService
    
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      Hcodigo:[''],
      Hcalificacion:['', Validators.required], 
      HComentarios: ['', Validators.required],  // Campo de texto para descripción
      HFecha: ['', Validators.required], 
      HContratoUsuario: ['', Validators.required],  // Selección del id de evaluación
    });
    this.cs.list().subscribe(data=>{
      this.listaContratosUsuario=data
    })
  }
  aceptar(): void {
    if (this.form.valid) {
      this.evaluacion.id = this.form.value.Hcodigo;
      this.evaluacion.calificacion = this.form.value.Hcalificacion;  // Asigna la descripción de la pregunta
      this.evaluacion.comentarios = this.form.value.HComentarios;  // Asigna la descripción de la pregunta
      this.evaluacion.fecha_evaluacion = this.form.value.HFecha;  // Asigna la descripción de la pregunta
      this.evaluacion.contratoUsuario.id= this.form.value.HContratoUsuario;  // Asigna el id de evaluación
    if(this.edicion){  
      this.es.insert(this.evaluacion).subscribe((data) => {
        this.es.list().subscribe(data => {
          this.es.setList(data)  // Actualiza la lista de preguntas
        
        });
      });
    }else{
      this.es.insert(this.evaluacion).subscribe((d)=> {
this.es.list().subscribe((d)=>{
  this.es.setList(d);
});


});
}
}
this.router.navigate(['evaluacion'])  // Redirige a la lista de ambientes
} 
init() {
  if (this.edicion) {
    this.es.listId(this.id).subscribe((data) => {
      this.form = new FormGroup({
        Hcodigo: new FormControl(data.id),
        Hcalificacion: new FormControl(data.calificacion),
        HComentarios: new FormControl(data.comentarios),
        HFecha: new FormControl(data.fecha_evaluacion),
        HContratoUsuario: new FormControl(data.contratoUsuario.id),  
      });
    });
  }
}
}