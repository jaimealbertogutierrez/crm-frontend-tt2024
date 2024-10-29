import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Agrega ReactiveFormsModule aquí
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      correo_electronico: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required]
    });
  }

  onLogin() {
    const formDataInicio = this.loginForm.value;
    let usuario = formDataInicio.correo_electronico;
    let clave = formDataInicio.clave; // Asegúrate de que el nombre del campo es 'contraseña'

    console.log("LOGIN: " + usuario);
    console.log("LOGIN: " + clave);

    if (this.loginForm.valid) {

        //this.authService.login(usuario, clave).subscribe({
        this.authService.loginSinCifran(usuario,clave).subscribe({
        next: (res) => {
          // Verificar si el correo del formulario coincide con el retornado en la respuesta
          if (res.user.correo_electronico === usuario && res.token) {
            // Guardar el token en el almacenamiento local (o donde sea necesario)
            localStorage.setItem('token', res.token);

            // Redirigir al dashboard
            this.router.navigate(['/dashboard'], {
              queryParams: {
                nombre: res.user.nombre_usuario, // Asumiendo que el nombre del usuario está en res.user.nombre_usuario
                correo: res.user.correo_electronico
              }
            });
          } else {
            // Alert si no se autentica correctamente
            alert('Los datos son incorrectos. Por favor, inténtelo de nuevo.');
          }
        },
        error: (err) => {
          // Manejo del error de inicio de sesión
          this.loginError = err.error.message || 'Error al iniciar sesión';
          alert(this.loginError); // Alert con el mensaje de error
        }
      });
    } else {
      alert('Los datos son incorrectos. Por favor, inténtelo de nuevo.');
    }
  }

}
