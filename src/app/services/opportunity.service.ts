import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../environments/environments';
import { Oportunidad } from '../models/oportunidad.model'; // Asegúrate de tener este modelo

@Injectable({
  providedIn: 'root'
})
export class OportunidadService {
  private apiApp = environment.apiUrl; // URL base de la API
  private apiUrl = this.apiApp + '/opportunities'; // URL para oportunidades
  private authUrl = this.apiApp + '/auth/login'; // URL de autenticación

  constructor(private http: HttpClient) {}

  // Método para autenticar y obtener el token
  login(correoElectronico: string, contrasena: string): Observable<any> {
    const payload = {
      correo_electronico: correoElectronico,
      contrasena: contrasena
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

  // Método para obtener todas las oportunidades
  getOportunidades(authToken: string): Observable<Oportunidad[]> {
    console.log("URL: " + this.apiUrl);
    console.log("Token generado: " + authToken);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: authToken ? `Bearer ${authToken}` : '',
      'X-Debug-Token': 'DebugInfo',
    });

    console.log("Cabeceras: ", headers);

    return this.http.get<Oportunidad[]>(this.apiUrl, { headers });
  }

  // Método para obtener una oportunidad por ID
  getOportunidadById(id: number, token: string): Observable<Oportunidad> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });

    console.log("URL para consulta de modificación: " + this.apiUrl);
    console.log("ID de la entidad: " + id);

    return this.http.get<Oportunidad>(`${this.apiUrl}/${id}`, { headers });
  }

  // Método para crear una nueva oportunidad
  createOportunidad(data: Oportunidad, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
    return this.http.post(this.apiUrl, JSON.stringify(data), { headers });
  }

  // Método para actualizar una oportunidad
  updateOportunidad(oportunidadId: number, data: Oportunidad, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
    return this.http.put(`${this.apiUrl}/${oportunidadId}`, JSON.stringify(data), { headers });
  }

  // Método para eliminar una oportunidad
  deleteOportunidad(oportunidadId: number, token: string): Observable<any> {
    return this.getToken().pipe(
      map(token => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        });

        return this.http.delete(`${this.apiUrl}/${oportunidadId}`, { headers }).pipe(
          catchError(error => {
            console.error(`Error al eliminar la oportunidad con ID ${oportunidadId}:`, error);
            return of(null);
          })
        );
      })
    );
  }
}
