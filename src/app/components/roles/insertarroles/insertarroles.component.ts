import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Roles } from '../../../models/roles';
import { Usuario } from '../../../models/usuario';
import { RolesService } from '../../../services/roles.service';
import { UsuarioService } from '../../../services/usuario.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-insertarroles',
  standalone: true,
  imports: [  MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    NgIf,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule],
  templateUrl: './insertarroles.component.html',
  styleUrl: './insertarroles.component.css'
})
export class InsertarrolesComponent {
  form: FormGroup = new FormGroup({});
  role: Roles = new Roles();
  listaUsers: Usuario[] = [];
  edicion: boolean = false;
  id: number = 0;
  listaroles: { value: string; viewValue: string }[] = [
    { value: 'ADMIN', viewValue: 'Administrador' },
    { value: 'INFLUENCER', viewValue: 'Influencer' },
    { value: 'EMPRENDEDOR', viewValue: 'Emprendedor' }
  ]

  constructor(
    private formBuilder: FormBuilder,
    private rS: RolesService,
    private uS: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    
    this.form = this.formBuilder.group({
      codigo: [''],
      usuario: ['', Validators.required],
      tipoRol: ['', Validators.required],
    });

    this.uS.list().subscribe((data) => {
      this.listaUsers = data;
    });
  }


  registrar(): void {
    if (this.form.valid) {
      this.role.id= this.form.value.codigo;
      this.role.usuario.id = this.form.value.usuario;
      this.role.tipoRol = this.form.value.tipoRol;
      this.rS.insert(this.role).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['listarrole']);
    }
  }

  init(){
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data)=>{
        this.form.setValue({
          codigo: data.id,
          usuario: data.usuario.id,
          tipoRol: data.tipoRol,
        });
      });
    }
  }


}
