import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Usuario } from '../../../models/usuario';
import { Roles } from '../../../models/roles';
import { UsuarioService } from '../../../services/usuario.service';
import { Tips } from '../../../models/tips';
import { TipsService } from '../../../services/tips.service';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-insertar-usuario',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    ReactiveFormsModule,
    CommonModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    RouterLink,
    NgIf,MatIconModule],
  templateUrl: './insertar-usuario.component.html',
  styleUrl: './insertar-usuario.component.css'
})
export class InsertarUsuarioComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  usuario: Usuario = new Usuario();
  id: number = 0;
  edicion: boolean = false;
  hidePassword = true;

  listatips: { value: number, viewValue: string }[] = [
    { value: 1, viewValue: '1' },
    { value: 2, viewValue: '2'  },
    { value: 3, viewValue: '3'  },
    
  ];

  constructor(
    private us: UsuarioService,
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
      codigo:[''],
      nombre: ['', Validators.required],  // Campo de texto para descripción
      contrasenia: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
      tips: ['', Validators.required],
    });
  }

  aceptar(): void {
    if (this.form.valid) {
      this.usuario.id = this.form.value.codigo;
      this.usuario.nombre = this.form.value.nombre;
      this.usuario.contrasenia = this.form.value.contrasenia;
      this.usuario.apellidos = this.form.value.apellidos;
      this.usuario.telefono = this.form.value.telefono;
      this.usuario.correo = this.form.value.correo;
      
      this.usuario.tips.id = this.form.value.tips;
      this.usuario.enabled=true;
    if(this.edicion){  
      this.us.insert(this.usuario).subscribe(() => {
        this.us.list().subscribe(d => {
          this.us.setList(d)  // Actualiza la lista de preguntas
        
        });
      });
    }else{
      this.us.insert(this.usuario).subscribe((d)=> {
this.us.list().subscribe((d)=>{
  this.us.setList(d);
});

      });
    }
    }
    this.router.navigate(['usuario']);  // Redirige a la lista de ambientes
  }
  init() {
    if (this.edicion) {
      this.us.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          codigo: new FormControl(data.id),
          nombre:new FormControl(data.nombre), 
          contrasenia: new FormControl(data.contrasenia),
          apellidos:new FormControl(data.apellidos),
          telefono:new FormControl(data.telefono),
          correo: new FormControl(data.correo),
          tips: new FormControl(data.tips.id),
        
          
        });
      });
    }
  }
}
