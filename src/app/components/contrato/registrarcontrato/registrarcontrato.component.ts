import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';import { CommonModule } from '@angular/common';
import { ContratoService } from '../../../services/contrato.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contrato } from '../../../models/contrato';
import { ContratoUsuario } from '../../../models/contratousuario';


@Component({
  selector: 'app-registrarcontrato',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, MatSelectModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './registrarcontrato.component.html',
  styleUrl: './registrarcontrato.component.css'
})
export class RegistrarcontratoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  contrato: Contrato = new Contrato();
  contratousuario: ContratoUsuario = new ContratoUsuario();

  constructor(
    private conS: ContratoService, 
    private formBuilder: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hcodigocontrato: [''],
      detallesContrato: ['', Validators.required],
      estado: ['Activo'],
    });
  }

  crearContrato(): void {
    if (this.form.valid) {
      this.contrato = {
        id: this.form.value.hcodigocontrato,
        detalle_contrato: this.form.value.detallesContrato,
        estado: this.form.value.estado
      };
      this.conS.insert(this.contrato).subscribe(() => {
        this.conS.list().subscribe((contrato) => {
          this.conS.setList(contrato);
        });
      });
    }
    this.router.navigate(['fechacontrato']);
  }
  
}