import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarTipsComponent } from './listar-tips/listar-tips.component';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [RouterOutlet, ListarTipsComponent],
  templateUrl: './tips.component.html',
  styleUrl: './tips.component.css'
})
export class TipsComponent implements OnInit {
  constructor(public route:ActivatedRoute){}

    
  ngOnInit(): void {
    
  }

}
