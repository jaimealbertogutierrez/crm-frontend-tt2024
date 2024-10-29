import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environments'; // Asegúrate de que esta ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private appUrl = `${environment.apiUrl}`;
  private apiUrlRegister = this.appUrl + `/auth/register`; // Usa la variable del entorno
  private apiUrlLogin = this.appUrl + `/auth/login`; // Usa la variable del entorno
  private apiUrlLoginSC = this.appUrl + `/auth/loginSinCifrar`; // Usa la variable del entorno

  constructor(private http: HttpClient) {}

  login(correoElectronico: string, contrasena: string): Observable<any> {
    const payload = {
      correo_electronico: correoElectronico,
      contrasena: contrasena
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrlLogin, JSON.stringify(payload), { headers });
  }

  loginSinCifran(correoElectronico: string, contrasena: string): Observable<any> {
    const payload = {
      correo_electronico: correoElectronico,
      contrasena: contrasena
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.apiUrlLoginSC, JSON.stringify(payload), { headers });
  }

  // Método para registrar un nuevo usuario
  register(data: { nombre_usuario: string; correo_electronico: string; contraasena: string; rol: string }): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json' // Asegúrate de enviar el tipo de contenido correcto
    });

    return this.http.post(this.apiUrlRegister, JSON.stringify(data), { headers })
        .pipe(
            catchError(this.handleError) // Maneja errores en la respuesta
        );
  }

  logout(): void {
    // Eliminar el token de autenticación y otros datos de sesión
    localStorage.removeItem('token'); // Elimina el token del localStorage
    sessionStorage.clear(); // Limpia todo el sessionStorage
    // Si tienes otros datos específicos de usuario, también debes eliminarlos
  }

  // Método para manejar errores de la API
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error); // Log del error en la consola
    return throwError(() => new Error('Error en la solicitud, por favor intenta de nuevo más tarde.'));
  }
}
