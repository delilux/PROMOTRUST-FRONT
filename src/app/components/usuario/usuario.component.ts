import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [RouterOutlet,ListarUsuarioComponent,MatTableModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit{
  constructor(public route:ActivatedRoute){}
  ngOnInit():void{}

}
