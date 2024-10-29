import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map, Observable, of, tap} from 'rxjs';
import { environment } from '../environments/environments';
import { Cliente } from '../models/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiApp = environment.apiUrl; // URL base de la API
  private apiUrl = this.apiApp + '/clients'; // URL para interacciones
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

  // Método para obtener la lista de clientes
  getClients(authToken: string): Observable<Cliente[]> {

    console.log ("url: " + this.apiUrl);
    console.log ("Token generado: " + authToken);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: authToken ? `Bearer ${authToken}` : '',
      'X-Debug-Token': 'DebugInfo',
    });

    console.log ("cabeceras: " + headers);

    return this.http.get<Cliente[]>(this.apiUrl, { headers });
  }


  // Agregando el método getClienteById con autorización Bearer
  getClientById(id: number, token: string): Observable<Cliente> {
    //const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });

    console.log ("url para consulta de modificacion: " + this.apiUrl);
    console.log ("id de la entidad: " + id);

    return this.http.get<Cliente>(`${this.apiUrl}/${id}`, { headers });
  }

  // Método para eliminar un cliente
  deleteClient(clientId: number, token: string): Observable<any> {
    //const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });

    return this.http.delete(`${this.apiUrl}/${clientId}`, { headers });
  }

  // Método para crear un cliente
  createCliente(data: { nombre: string; direccion: string; correo_electronico: string; telefono: string }, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });
    return this.http.post(this.apiUrl, JSON.stringify(data), { headers });
  }

  // Método para actualizar un cliente
  updateClient(clientId: number, data: Cliente, token: string): Observable<any> {
    //const token = this.getToken();
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    });

    return this.http.put(`${this.apiUrl}/${clientId}`, JSON.stringify(data), { headers });
  }

}
