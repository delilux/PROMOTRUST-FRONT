import { Component } from '@angular/core';
import { ListarcontratousuarioComponent } from './listarcontratousuario/listarcontratousuario.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-contratousuario',
  standalone: true,
  imports: [ListarcontratousuarioComponent, RouterOutlet],
  templateUrl: './contratousuario.component.html',
  styleUrl: './contratousuario.component.css'
})
export class ContratousuarioComponent {
  constructor( public route:ActivatedRoute){}

}
