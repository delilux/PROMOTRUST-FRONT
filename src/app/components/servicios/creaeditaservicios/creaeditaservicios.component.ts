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
import { CommonModule } from '@angular/common';
import { Servicios } from '../../../models/servicios';
import { Contrato } from '../../../models/contrato';
import { ServiciosService } from '../../../services/servicios.service';
import { ContratoService } from '../../../services/contrato.service';

@Component({
  selector: 'app-creaeditaservicios',
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
    MatFormFieldModule,
  ],
  templateUrl: './creaeditaservicios.component.html',   
  styleUrl: './creaeditaservicios.component.css'
})
export class CreaeditaserviciosComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  servicios: Servicios = new Servicios();
  id: number = 0;
  edicion: boolean = false;

  listaCategoria: { value: string; viewValue: string }[] = [
    { value: 'MuyBuena', viewValue: 'MuyBuena' },
    { value: 'Buena', viewValue: 'Buena' },
    { value: 'Mala', viewValue: 'mala' },
    { value: 'MuyMala', viewValue: 'MuyMala' },
  ];
  listaEstado: { value: string; viewValue: string }[] = [
    { value: 'No_Disponible', viewValue: 'No_Disponible' },
    { value: 'Disponible', viewValue: 'Disponible' },
    { value: 'SinInformacion', viewValue: 'SinInformacion' },
   
  ];

  listacontrato:Contrato[]=[];

  constructor(
    private formBuilder:FormBuilder,
    private Ss:ServiciosService, 
    private router:Router,
    private Cs:ContratoService ,
    private route: ActivatedRoute
){}
ngOnInit(): void {
  this.route.params.subscribe((data: Params) => {
    this.id = data['id'];
    this.edicion = data['id'] != null;
    this.init();
  });
  
 this.form=this.formBuilder.group({
  hcodigo: [''],
hnombre:['',Validators.required],
hdescripcion:['',Validators.required],
hprecio:['',Validators.required],
hcategoria:['',Validators.required],
hestado:['',Validators.required],
hcontrato:['',Validators.required],
     }); 
     this.Cs.list().subscribe(data=>{
      this.listacontrato=data
    })
  }
  aceptar():void{
    if(this.form.valid){ 
      this.servicios.id = this.form.value.hcodigo;  
   this.servicios.nombre_servicio = this.form.value.hnombre;
    this.servicios.descripcion = this.form.value.hdescripcion;
    this.servicios.precio = this.form.value.hprecio;
    this.servicios.categoria_servic = this.form.value.hcategoria;
    this.servicios.estado_servic = this.form.value.hestado;
    this.servicios.contrato.id = this.form.value.hcontrato;
    if(this.edicion){   
    this.Ss.update(this.servicios).subscribe((data)=>{
      this.Ss.list().subscribe((data) => {
        this.Ss.setList(data);
      });
    });
  }else{
    this.Ss.insert(this.servicios).subscribe((d) => {
      this.Ss.list().subscribe((d) => {
        this.Ss.setList(d);
     });
    });
   }
  }
  this.router.navigate(['servicio'])
  }
  init() {
    if (this.edicion){
      this.Ss.listId(this.id).subscribe((data)=> {
        this.form = new FormGroup({
          hcodigo: new FormControl(data.id),
          hnombre: new FormControl(data.nombre_servicio),
          hdescripcion: new FormControl(data.descripcion),
          hprecio: new FormControl(data.precio),
          hcategoria: new FormControl(data.categoria_servic),
          hestado: new FormControl(data.estado_servic),
          hcontrato: new FormControl(data.contrato.id),
        });
      });
    }
  }
}
