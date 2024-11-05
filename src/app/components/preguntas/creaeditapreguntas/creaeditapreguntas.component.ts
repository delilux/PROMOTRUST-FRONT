import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { 
  FormBuilder, 
  FormGroup,
   ReactiveFormsModule, 
  Validators,
  FormControl,
 } from '@angular/forms';
 import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { PreguntasService } from '../../../services/preguntas.service';
import { Preguntas } from '../../../models/preguntas';
import { EvaluacionService } from '../../../services/evaluacion.service';
import { Evaluacion } from '../../../models/evaluacion';


@Component({
  selector: 'app-creaeditapreguntas',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './creaeditapreguntas.component.html',
  styleUrl: './creaeditapreguntas.component.css'
})
export class CreaeditapreguntasComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  pregunta: Preguntas = new Preguntas();
  id: number = 0;
  edicion: boolean = false;
 

  listaEvaluacion:Evaluacion[]=[];

  constructor(
    private rs: PreguntasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private  es:EvaluacionService
    
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      Hcodigo:[''],
      HdescripcionPreguntas: ['', Validators.required],  // Campo de texto para descripción
      HidEvaluacion: ['', Validators.required],  // Selección del id de evaluación
    });
    this.es.list().subscribe(data=>{
      this.listaEvaluacion=data
    })
  }

  aceptar(): void {
    if (this.form.valid) {
      this.pregunta.id = this.form.value.Hcodigo;
      this.pregunta.descripcionPreguntas = this.form.value.HdescripcionPreguntas;  // Asigna la descripción de la pregunta
      this.pregunta.evaluacion.id = this.form.value.HidEvaluacion;  // Asigna el id de evaluación
    if(this.edicion){  
      this.rs.update(this.pregunta).subscribe((data) => {
        this.rs.list().subscribe(data => {
          this.rs.setList(data)  // Actualiza la lista de preguntas
        
        });
      });
    }else{
      this.rs.insert(this.pregunta).subscribe((d)=> {
this.rs.list().subscribe((d)=>{
  this.rs.setList(d);
});

      });
    }
    }
    this.router.navigate(['preguntas']);  // Redirige a la lista de ambientes
  }
  init() {
    if (this.edicion) {
      this.rs.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          Hcodigo: new FormControl(data.id),
          HdescripcionPreguntas: new FormControl(data.descripcionPreguntas),
          HidEvaluacion: new FormControl(data.evaluacion.id),  
        });
      });
    }
  }
}
