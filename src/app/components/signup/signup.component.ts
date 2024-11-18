import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Signup } from '../../models/signup';
import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    RouterLink,
    NgIf,
    MatIconModule,
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Signup = new Signup();
  id: number = 0;
  edicion: boolean = false;
  hidePassword = true;

  listatips: { value: number; viewValue: string }[] = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2' },
    { value: 3, viewValue: '3' },
  ];

  constructor(
    private us: SignupService,
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
      codigo: [''],
      nombre: ['', Validators.required],
      contrasenia: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      tips: [''], // No es obligatorio
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usuario = {
        ...this.usuario,
        id: this.form.value.codigo,
        nombre: this.form.value.nombre,
        contrasenia: this.form.value.contrasenia,
        apellidos: this.form.value.apellidos,
        telefono: this.form.value.telefono,
        correo: this.form.value.correo,
        tips: this.form.value.tips
          ? { id: this.form.value.tips, contenido: '', fecha_creacion: new Date() }
          : null, // Asignar `null` si no se seleccionó un tip
        enabled: true,
      };

      if (this.edicion) {
        this.us.update(this.usuario).subscribe(() => {
          this.us.list().subscribe((d) => {
            this.us.setList(d);
          });
        });
      } else {
        this.us.insert(this.usuario).subscribe(() => {
          this.us.list().subscribe((d) => {
            this.us.setList(d);
          });
        });
      }
      this.router.navigate(['usuario']);
    } else {
      console.error('Formulario inválido', this.form.errors);
    }
  }

  init(): void {
    if (this.edicion) {
      this.us.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          nombre: new FormControl(data.nombre),
          contrasenia: new FormControl(data.contrasenia),
          apellidos: new FormControl(data.apellidos),
          telefono: new FormControl(data.telefono),
          correo: new FormControl(data.correo),
          tips: new FormControl(data.tips ? data.tips.id : null),
        });
      });
    }
  }
}
