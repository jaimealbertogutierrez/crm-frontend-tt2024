import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {CommonModule} from '@angular/common'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,CommonModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Cambié a 'styleUrls' para que funcione correctamente
})
export class DashboardComponent {
  nombre: string = ''; // Inicializado como cadena vacía
  correo: string = ''; // Inicializado como cadena vacía
  showModal: boolean = false; // Controla la visibilidad del modal

  constructor(private routeAR: ActivatedRoute, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Obtener los parámetros de la ruta
    this.routeAR.queryParams.subscribe(params => {
      this.nombre = params['nombre'];
      this.correo = params['correo'];
    });
  }

  confirmLogout(): void {
    this.showModal = true; // Muestra el modal
  }

  cancel(): void {
    this.showModal = false; // Oculta el modal
  }
  logout(): void {
    this.authService.logout(); // Lógica para cerrar sesión
    this.router.navigate(['/home']); // Redirige al componente home
  }

  navigateTo(route: string): void {
    this.router.navigate([route]); // Asegúrate de usar un array
  }
}
