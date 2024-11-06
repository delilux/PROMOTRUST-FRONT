import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarevaluacionComponent } from './listarevaluacion/listarevaluacion.component';
 
@Component({
  selector: 'app-evaluacion',
  standalone: true,
  imports: [ListarevaluacionComponent,RouterOutlet],
  templateUrl: './evaluacion.component.html',
  styleUrl: './evaluacion.component.css'
})
export class EvaluacionComponent {
  constructor(public route:ActivatedRoute){}

}
