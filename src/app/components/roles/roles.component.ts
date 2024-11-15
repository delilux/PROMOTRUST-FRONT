import { Component, OnInit } from '@angular/core';
import { ListarRolesComponent } from './listar-roles/listar-roles.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [ListarRolesComponent, RouterOutlet],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent implements OnInit {
  constructor(public route: ActivatedRoute) { }
  ngOnInit(): void {

  }

}
