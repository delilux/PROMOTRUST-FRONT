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
import { CommonModule } from '@angular/common';
import { Metricas } from '../../../models/metricas';
import { ContratoService } from '../../../services/contrato.service';
import { MetricasService } from '../../../services/metricas.service';

@Component({
  selector: 'app-registrarmetrica',
  providers: [provideNativeDateAdapter()],
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CommonModule,
  ],
  templateUrl: './registrarmetrica.component.html',
  styleUrl: './registrarmetrica.component.css'
})
export class RegistrarmetricaComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  metrica: Metricas = new Metricas();
  id: number = 0;
  edicion: boolean = false;

  listaContrato: any[] = [];
  listaUsuario: any[] = [];

  constructor(
    private mS: MetricasService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private conS: ContratoService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      Hid: [''],
      Halcancepersona: ['', Validators.required],
      Hingresosgenerados: ['', Validators.required],
      Hlikes: ['', Validators.required],
      Hcomentarios: ['', Validators.required],
      Hcompartidos: ['', Validators.required],
      HidContrato: ['', Validators.required],
    });

    // Cargar lista de contratos
    this.conS.list().subscribe((data) => {
      this.listaContrato = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.metrica.id = this.form.value.Hid;
      this.metrica.alcancepersonas = this.form.value.Halcancepersona;
      this.metrica.ingresosgenerados = this.form.value.Hingresosgenerados;
      this.metrica.likes = this.form.value.Hlikes;
      this.metrica.comentarios = this.form.value.Hcomentarios;
      this.metrica.compartidos = this.form.value.Hcompartidos;
      this.metrica.contrato.id = this.form.value.HidContrato;

      if (this.edicion) {
        this.mS.update(this.metrica).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      } else {
        this.mS.insert(this.metrica).subscribe(() => {
          this.mS.list().subscribe((data) => {
            this.mS.setList(data);
          });
        });
      }
      this.router.navigate(['/metricas/creaeditarm']);
    }
  }

  init() {
    if (this.edicion) {
      this.mS.getlistid(this.id).subscribe((data) => {
        this.form = this.formBuilder.group({
          Hid: new FormControl(data.id),
          Halcancepersona: new FormControl(data.alcancepersonas),
          Hingresosgenerados: new FormControl(data.ingresosgenerados),
          Hlikes: new FormControl(data.likes),
          Hcomentarios: new FormControl(data.comentarios),
          Hcompartidos: new FormControl(data.compartidos),
          HidContrato: new FormControl(data.contrato.id),
        });
      });
    }
  }
}
