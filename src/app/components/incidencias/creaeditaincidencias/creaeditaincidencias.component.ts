import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';


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
import { Contrato } from '../../../models/contrato';
import { ContratoService } from '../../../services/contrato.service';

 

@Component({
  selector: 'app-creaeditaincidencias',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CommonModule, ],
    
  templateUrl: './creaeditaincidencias.component.html',
  styleUrl: './creaeditaincidencias.component.css'
})
export class CreaeditaincidenciasComponent implements OnInit{
  form:FormGroup=new  FormGroup({});
  incidencia: Incidencias = new Incidencias();
  id: number = 0;
  edicion: boolean = false;

  listaAmbientes:Contrato[]=[];

constructor(
  private rs:IncidenciasService,
  private formBuilder:FormBuilder,
  private router:Router,
  private route: ActivatedRoute,
  private cs: ContratoService

){}
ngOnInit(): void {
  this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.edicion = data['id'] != null;
    this.init();
  });

  this.form = this.formBuilder.group({
    Hcodigo:[''],
    HdescripcionIncidencias: ['', Validators.required], // Campo para la descripción
    Hfecha_Incidencia: ['', Validators.required], // Campo para la fecha de la incidencia
    HidContrato: ['', Validators.required] // Asegúrate de agregar todos los campos que necesites
  });
  this.cs.list().subscribe(data=>{
    this.listaAmbientes=data
  })
}
 aceptar(): void {
    if (this.form.valid) {
      // Asigna los valores del formulario a la incidencia
      this.incidencia.id = this.form.value.Hcodigo;
      this.incidencia.descripcionIncidencias = this.form.value.HdescripcionIncidencias;
      this.incidencia.fecha_Incidencia = this.form.value.Hfecha_Incidencia;
      this.incidencia.contrato.id = this.form.value.HidContrato;
if(this.edicion){
  this.rs.update(this.incidencia).subscribe((data)=>{
    this.rs.list().subscribe((data) =>{
      this.rs.setList(data);
    });
  });
}else{
  this.rs.insert(this.incidencia).subscribe((d)=>{
    this.rs.list().subscribe((d)=>{
      this.rs.setList(d);
    });
  });
 } }
  this.router.navigate(['incidencias'])  
  }
 init() {
    if (this.edicion) {
      this.rs.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
         Hcodigo: new FormControl(data.id),
          HdescripcionIncidencias: new FormControl(data.descripcionIncidencias),       
          Hfecha_Incidencia: new FormControl(data.fecha_Incidencia),
          HidContrato: new FormControl(data.contrato.id),
        });
      });
    }
  }
}