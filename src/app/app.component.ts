import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { ContratousuarioComponent } from './components/contratousuario/contratousuario.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ContratousuarioComponent, MatToolbarModule, MatIconModule, MatMenuModule, MatButton, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PROMOTRUST';
}
