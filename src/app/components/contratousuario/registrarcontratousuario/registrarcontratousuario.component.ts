import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ContratoUsuario } from '../../../models/contratousuario';
import { ContratousuarioService } from '../../../services/contratousuario.service';
import { ContratoComponent } from '../../contrato/contrato.component';
import { ContratoService } from '../../../services/contrato.service';

@Component({
  selector: 'app-registrarcontratousuario',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registrarcontratousuario.component.html',
  styleUrl: './registrarcontratousuario.component.css'
})
export class RegistrarcontratousuarioComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  contratousuario: ContratoUsuario = new ContratoUsuario();
  idcontrato: number = 0;
  edicion: boolean = false;

  constructor(
    private conuS: ContratousuarioService,
    private conS: ContratoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hcodigocontrato: [''],
      fechainicio: ['', Validators.required],
      fechafin: ['', Validators.required],
      hcodigocontratousuario: [''],
      hcodigousuario: ['']
    });}

  crearContratoUsuario(): void {
    if (this.form.valid) {
      this.contratousuario = {
        id: this.form.value.hcodigocontratousuario,
        fecha_inicio: this.form.value.fechainicio,
        fecha_fin: this.form.value.fechafin,
        contrato: this.form.value.hcodigocontrato,
        usuario: this.form.value.hcodigousuario
      };
      this.conuS.insert(this.contratousuario).subscribe(() => {
        this.conuS.list().subscribe((contratousuario) => {
          this.conuS.setList(contratousuario);
        });
      });
    }
  }

  init(): void {
    if (this.edicion) {
      this.conS.listid(this.idcontrato).subscribe((data) => {
        this.form.patchValue({
          hcodigocontrato: data.id,
          detalle: data.detalle_contrato,
          estado:data.estado
        });
      });
    }
  }
}