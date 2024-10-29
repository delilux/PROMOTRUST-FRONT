import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ContratoComponent } from '../contrato/contrato.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatIconModule, RouterModule, ContratoComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  constructor( public route:ActivatedRoute){}

}
