import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../environments/environments';
import { Interaccion } from '../models/interaccion.model';
import {Cliente} from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class InteractionService {
  private apiApp = environment.apiUrl; // URL base de la API
  private apiUrl = this.apiApp + '/interactions'; // URL para interacciones
  private authUrl = this.apiApp + '/auth/login'; // URL de autenticación

  constructor(private http: HttpClient) {}

  // Método para autenticar y obtener el token
  login(correoElectronico: string, contraasena: string): Observable<any> {
    const payload = {
      correo_electronico: correoElectronico,
      contrasena: contraasena
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(this.authUrl, JSON.stringify(payload), { headers });
  }

  // Método para obtener el token quemado
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
  // Método para obtener todas las interacciones
  getInteractions(authToken: string): Observable<Interaccion[]> {
  console.log ("url: " + this.apiUrl);
  console.log ("Token generado: " + authToken);

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: authToken ? `Bearer ${authToken}` : '',
    'X-Debug-Token': 'DebugInfo',
  });

  console.log ("cabeceras: " + headers);

  return this.http.get<Interaccion[]>(this.apiUrl, { headers });
}

  getInteraccionById(id: number, token: string): Observable<Interaccion> {
    //const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });

    console.log ("url para consulta de modificacion: " + this.apiUrl);
    console.log ("id de la entidad: " + id);

    return this.http.get<Interaccion>(`${this.apiUrl}/${id}`, { headers });
  }


  // Método para crear una interacción
  createInteraccion(data: Interaccion, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
    return this.http.post(this.apiUrl, JSON.stringify(data), { headers });
  }

  // Método para actualizar una interacción
  updateInteraccion(interaccionId: number, data: Interaccion, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
    return this.http.put(`${this.apiUrl}/${interaccionId}`, JSON.stringify(data), { headers });
  }

  // Método para eliminar una interacción
  deleteInteraction(interactionId: number, token: string): Observable<any> {
    return this.getToken().pipe(
      map(token => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        });

        return this.http.delete(`${this.apiUrl}/${interactionId}`, { headers }).pipe(
          catchError(error => {
            console.error(`Error al eliminar la interacción con ID ${interactionId}:`, error);
            return of(null);
          })
        );
      })
    );
  }
}
