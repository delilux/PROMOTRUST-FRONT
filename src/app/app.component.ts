import { Component } from '@angular/core';
import { RouterModule, RouterOutlet, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButton } from '@angular/material/button';
import { ContratousuarioComponent } from './components/contratousuario/contratousuario.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
     RouterOutlet,
     ContratousuarioComponent, 
     MatToolbarModule, 
     MatIconModule, 
     MatMenuModule, 
     MatButton, 
     RouterModule,
     RouterOutlet,
    MatDatepickerModule, //fecha
    MatNativeDateModule, //fecha
    MatButtonModule,
    RouterLink,
    NgIf,
    ReactiveFormsModule,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'PROMOTRUST';
  role: string = '';
  constructor(private loginService: LoginService) {}
  cerrar() {
    sessionStorage.clear();
  }

  verificar() {
    this.role = this.loginService.showRole();
    return this.loginService.verificar();
  }
  isinfluencer() {
    return this.role === 'INFLUENCER';
  }

  isAdmin() {
    return this.role === 'ADMIN';
  }

}
