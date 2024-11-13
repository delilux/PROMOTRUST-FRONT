
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { Contrato } from '../../../models/contrato';
import { ContratoService } from '../../../services/contrato.service';

@Component({
  selector: 'app-editarcontrato',
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
  templateUrl: './editarcontrato.component.html',
  styleUrl: './editarcontrato.component.css',
})
export class EditarcontratoComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  contrato: Contrato = new Contrato();
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private conS: ContratoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      hid: [{ value: '', disabled: true }], // Agregado el valor inicial y disabled
      hdetalle_contrato: ['', Validators.required],
      hestado: ['', Validators.required],
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = this.id != null;
      this.init();
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.contrato.id = this.form.get('hid')?.value;
      this.contrato.detalle_contrato = this.form.get('hdetalle_contrato')?.value;
      this.contrato.estado = this.form.get('hestado')?.value;

      if (this.edicion) {
        this.conS.update(this.contrato).subscribe(() => {
          this.conS.list().subscribe(data => {
            this.conS.setList(data);
            this.router.navigate(['contrato/contratocreaedita']);
          });
        });
      } else {
        this.conS.insert(this.contrato).subscribe(() => {
          this.conS.list().subscribe(data => {
            this.conS.setList(data);
            this.router.navigate(['contrato/contratocreaedita']);
          });
        });
      }
    }
  }

  init(): void {
    if (this.edicion) {
      this.conS.getlistid(this.id).subscribe((data) => {
        this.form.patchValue({
          hid: data.id,
          hdetalle_contrato: data.detalle_contrato,
          hestado: data.estado,
        });
      });
    }
  }
}



