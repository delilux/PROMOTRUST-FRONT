import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Tips } from '../../../models/tips';
import { TipsService } from '../../../services/tips.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaditatips',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ 
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
  ],
  templateUrl: './creaditatips.component.html',
  styleUrl: './creaditatips.component.css'
})
export class CreaditatipsComponent  implements OnInit{
  form: FormGroup = new FormGroup({});
  tips: Tips = new Tips();
  id: number = 0;
  edicion: boolean = false;
  constructor(
    private ts: TipsService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      hcodigo:['', Validators.required],
      hcontenido: ['', Validators.required],  // Campo de texto para descripción
      hfecha: ['', Validators.required]  // Selección del id de evaluación
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.tips.id = this.form.value.hcodigo;
      this.tips.contenido = this.form.value.hcontenido;  // Asigna la descripción de la pregunta
      this.tips.fecha_creacion = this.form.value.hfecha;  // Asigna el id de evaluación
    if(this.edicion){  
      this.ts.update(this.tips).subscribe((data) => {
        this.ts.list().subscribe(data => {
          this.ts.setList(data)  // Actualiza la lista de preguntas
        });
      });
    }else{
      this.ts.insert(this.tips).subscribe((d)=> {
      this.ts.list().subscribe((d)=>{
      this.ts.setList(d);
      });
      });
    }
    }
    this.router.navigate(['vertips']);  // Redirige a la lista de ambientes
  }
  init() {
    if (this.edicion) {
      this.ts.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.id),
          hcontenido: new FormControl(data.contenido),
          hfecha: new FormControl(data.fecha_creacion),
        });
      });
    }
  }
}
