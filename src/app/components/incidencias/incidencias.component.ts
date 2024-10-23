import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarIncidenciasComponent } from './listar-incidencias/listar-incidencias.component';


@Component({
  selector: 'app-incidencias',
  standalone: true,
  imports: [ListarIncidenciasComponent,RouterOutlet],
  templateUrl: './incidencias.component.html',
  styleUrl: './incidencias.component.css'
})
export class IncidenciasComponent {
  constructor(public route:ActivatedRoute){}
}
