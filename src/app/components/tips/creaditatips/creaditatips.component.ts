import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Tips } from '../../../models/Tips';
import { TipsService } from '../../../services/tips.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-creaditatips',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [ MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,MatDatepickerModule],
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
    
  ) { }
  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      codigo:['', Validators.required],
      contenido: ['', Validators.required],  // Campo de texto para descripción
      fecha: ['', Validators.required]  // Selección del id de evaluación
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.tips.id = this.form.value.codigo;
      this.tips.contenido = this.form.value.contenido;  // Asigna la descripción de la pregunta
      this.tips.fecha_creacion = this.form.value.fecha;  // Asigna el id de evaluación
    if(this.edicion){  
      this.ts.insert(this.tips).subscribe(() => {
        this.ts.list().subscribe(d => {
          this.ts.setList(d)  // Actualiza la lista de preguntas
        
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
          codigo: new FormControl(data.id),
          contenido: new FormControl(data.contenido),
          fecha: new FormControl(data.fecha_creacion),
          
        });
      });
    }
  }




}
