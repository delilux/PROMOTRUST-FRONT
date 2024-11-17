import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Pago } from '../../../models/pago';
import { Contrato } from '../../../models/contrato';
import { MetodoPago } from '../../../models/metodopago';
import { PagoService } from '../../../services/pago.service';
import { MetodopagoService } from '../../../services/metodopago.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ContratoService } from '../../../services/contrato.service';

@Component({
  selector: 'app-creaeditapago',
  standalone: true,
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatNativeDateModule,
    MatDatepickerModule,
  ],
  templateUrl: './creaeditapago.component.html',
  styleUrl: './creaeditapago.component.css'
})
export class CreaeditapagoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  pago: Pago = new Pago();
  id: number = 0;
  edicion:boolean = false;
  metodosPagos: MetodoPago[] = [];
  contratos: Contrato[] = [];

  constructor(
    private formBuilber: FormBuilder,
    private eS: PagoService,
    private mpS: MetodopagoService,
    private cS: ContratoService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id=data['id'];
      this.edicion=data['id']!=null;
      //llamar a metodo llene el formulario del registro a editar

      this.init()
    })

    this.form = this.formBuilber.group({
      codigo: [''],
      monto: ['', Validators.required],
      fecha_pago: ['', Validators.required],
      contrato_id: ['', Validators.required],
      metodopago_id: ['', Validators.required],
    });

    this.cS.list().subscribe((data) => {
      this.contratos = data;
    });
    this.mpS.list().subscribe((data) => {
      this.metodosPagos = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.pago.id = this.form.value.codigo;
      this.pago.monto = this.form.value.monto;
      this.pago.fecha_pago = this.form.value.fecha_pago;
      this.pago.contrato.id = this.form.value.contrato_id;
      this.pago.metodopago.id = this.form.value.metodopago_id;

      console.log("ptmr  ", this.pago.metodopago.id);

      if(this.edicion){
          this.eS.update(this.pago).subscribe((data) => {
            this.eS.list().subscribe((data) => {
              this.eS.setList(data);
            });
          });
        }
        else{
          this.eS.insert(this.pago).subscribe((data) => {
            this.eS.list().subscribe((data) => {
              this.eS.setList(data);
            });
          });
        }

      this.router.navigate(['pago']);
    }
  }

  init(){
    if(this.edicion){
      this.eS.listId(this.id).subscribe((data)=>{
        this.form=new FormGroup({
          codigo: new FormControl(data.id),
          monto: new FormControl(data.monto),
          fecha_pago: new FormControl(data.fecha_pago),
          contrato_id: new FormControl(data.contrato),
          metodopago_id: new FormControl(data.metodopago.id),
        })
      })
    }
  }
}

