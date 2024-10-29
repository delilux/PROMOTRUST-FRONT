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
import { PreguntasService } from '../../../services/preguntas.service';
import { Preguntas } from '../../../models/preguntas';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-creaeditapreguntas',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
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

  listaEvaluaciones: { value: number, viewValue: string }[] = [
    { value: 1, viewValue: 'Evaluación 1' },
    { value: 2, viewValue: 'Evaluación 2' },
    { value: 3, viewValue: 'Evaluación 3' },
    // Agrega más evaluaciones según sea necesario
  ];

  constructor(
    private preguntasService: PreguntasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
    
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      descripcionPreguntas: ['', Validators.required],  // Campo de texto para descripción
      idEvaluacion: ['', Validators.required]  // Selección del id de evaluación
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.pregunta.descripcionPreguntas = this.form.value.descripcionPreguntas;  // Asigna la descripción de la pregunta
      this.pregunta.evaluacion.id = this.form.value.idEvaluacion;  // Asigna el id de evaluación

      this.preguntasService.insert(this.pregunta).subscribe(() => {
        this.preguntasService.list().subscribe(d => {
          this.preguntasService.setList(d)  // Actualiza la lista de preguntas
        
        });
      });
    }
    this.router.navigate(['preguntas']);  // Redirige a la lista de ambientes
  }
  init() {
    if (this.edicion) {
      this.preguntasService.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.descripcionPreguntas),
          hambiente: new FormControl(data.evaluacion),
          hubicacion: new FormControl(data.id),
        });
      });
    }
  }
}
