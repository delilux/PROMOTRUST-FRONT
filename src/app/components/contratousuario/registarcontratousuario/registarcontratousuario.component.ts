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
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { ContratousuarioService } from '../../../services/contratousuario.service';
import { ContratoUsuario } from '../../../models/contratousuario';
import { ContratoService } from '../../../services/contrato.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-registarcontratousuario',
  standalone: true,
  imports: [  MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    CommonModule,RouterModule],
  templateUrl: './registarcontratousuario.component.html',
  styleUrl: './registarcontratousuario.component.css'
})
export class RegistarcontratousuarioComponent {
  form: FormGroup = new FormGroup({});
  contratousuario: ContratoUsuario = new ContratoUsuario();
  id: number = 0;
  edicion: boolean = false;

  listaContrato: any[] = [];
  listaUsuario: any[] = [];

  constructor(
    private conSU: ContratousuarioService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private conS: ContratoService,
    private uS: UsuarioService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      Hid: [''],
      Hfechainicio: ['', Validators.required],
      Hfechafin: ['', Validators.required],
      HidContrato: ['', Validators.required],
      HidUsuario: ['', Validators.required]
    });

    // Cargar lista de contratos
    this.conS.list().subscribe((data) => {
      this.listaContrato = data;
    });

    // Cargar lista de usuarios
    this.uS.list().subscribe((data) => {
      this.listaUsuario = data;
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.contratousuario.id = this.form.value.Hid;
      this.contratousuario.fecha_inicio = this.form.value.Hfechainicio;
      this.contratousuario.fecha_fin = this.form.value.Hfechafin;
      this.contratousuario.contrato.id = this.form.value.HidContrato;
      this.contratousuario.usuario.id = this.form.value.HidUsuario;

      if (this.edicion) {
        this.conSU.update(this.contratousuario).subscribe(() => {
          this.conSU.list().subscribe((data) => {
            this.conSU.setList(data);
          });
        });
      } else {
        this.conSU.insert(this.contratousuario).subscribe(() => {
          this.conSU.list().subscribe((data) => {
            this.conSU.setList(data);
          });
        });
      }
      this.router.navigate(['contratousuario/creareditar']);
    }
  }

  init() {
    if (this.edicion) {
      this.conSU.getlistid(this.id).subscribe((data) => {
        this.form = new FormGroup({
          Hid: new FormControl(data.id),
          Hfechainicio: new FormControl(data.fecha_inicio),
          Hfechafin: new FormControl(data.fecha_fin),
          HidContrato: new FormControl(data.contrato.id),
          HidUsuario: new FormControl(data.usuario.id),
        });
      });
    }
  }
}


