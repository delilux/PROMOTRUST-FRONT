import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarPreguntasComponent } from './listar-preguntas/listar-preguntas.component';
 
 
 
@Component({
  selector: 'app-preguntas',
  standalone: true,
  imports: [ListarPreguntasComponent, RouterOutlet ],
  templateUrl: './preguntas.component.html',
  styleUrl: './preguntas.component.css'

})
export class PreguntasComponent {
  constructor(public route:ActivatedRoute){}
}
