import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../environments/environments'; // Ajusta la ruta según tu estructura de carpetas
import { Pago } from '../models/pago.model'; // Asegúrate de crear el modelo Pago

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/pagos`; // URL de la API

  constructor(private http: HttpClient) {}

  // Método para obtener el token de forma quemada
  public getToken(): Observable<string> {
    const user = 'admin@crm.com'; // Correo electrónico quemado
    const password = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'; // contraasena quemada

    return this.login(user, password).pipe(
      map(response => {
        const token = response.token; // Asigna el token
        console.log('Token obtenido:', token); // Imprimir el token
        return token; // Retorna el token
      }),
      catchError(error => {
        console.error('Error al obtener el token:', error);
        return of(''); // Retorna un string vacío en caso de error
      })
    );
  }

  // Crear un enlace de pago
  createPaymentLink(pago: Pago, authToken: string): Observable<Pago> {
    const headers = this.createAuthorizationHeaders(authToken);
    return this.http.post<Pago>(this.apiUrl, pago, { headers });
  }

  // Verificar el estado del pago
  verifyPayment(transactionId: string, authToken: string): Observable<{ message: string; transactionId: string }> {
    const headers = this.createAuthorizationHeaders(authToken);
    return this.http.get<{ message: string; transactionId: string }>(`${this.apiUrl}/verify/${transactionId}`, { headers });
  }

  // Método para crear las cabeceras con autorización
  private createAuthorizationHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
  }

  // Método para autenticar y obtener el token (puedes ajustarlo según tu API)
  private login(correoElectronico: string, contraasena: string): Observable<any> {
    const payload = {
      correo_electronico: correoElectronico,
      contrasena: contraasena
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${environment.apiUrl}/auth/login`, JSON.stringify(payload), { headers });
  }
}
