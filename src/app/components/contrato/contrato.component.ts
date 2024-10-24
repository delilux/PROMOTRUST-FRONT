import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { RegistrarcontratoComponent } from './registrarcontrato/registrarcontrato.component';

@Component({
  selector: 'app-contrato',
  standalone: true,
  imports: [RegistrarcontratoComponent, RouterOutlet],
  templateUrl: './contrato.component.html',
  styleUrl: './contrato.component.css'
})
export class ContratoComponent {
  constructor( public route:ActivatedRoute){}

}
