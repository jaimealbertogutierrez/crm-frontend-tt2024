import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ClientService } from '../../services/client.service'; // Asegúrate de que la ruta sea correcta
import { Cliente } from '../../models/cliente.model';
import {switchMap} from 'rxjs';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-clientes-detail',
  templateUrl: './clientes-detail.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./clientes-detail.component.css']
})
export class ClientesDetailComponent implements OnInit {
  entity: Cliente = {
    cliente_id: 0,                  // ID por defecto
    nombre: '',                      // Nombre por defecto vacío
    direccion: undefined,            // Dirección por defecto opcional
    correo_electronico: undefined,   // Correo electrónico por defecto opcional
    telefono: undefined               // Teléfono por defecto opcional
  };

  entityId: number = 0;

  constructor(private router: Router, private actroute: ActivatedRoute, private clientService: ClientService) {}

  ngOnInit(): void {
    this.entityId = +this.actroute.snapshot.paramMap.get('id')!;
    this.loadEntity();
  }

  loadEntity(): void {
    this.clientService.getToken().pipe(
      switchMap(authToken => {
        // Llama a getClients con el token obtenido
        return this.clientService.getClients(authToken);
      })
    ).subscribe(
      (clients: Cliente[]) => { // Especifica que clients es un array de Cliente
        // Filtra los clientes para encontrar el que coincida con entityId
        this.entity = clients.find((client: Cliente) => client.cliente_id === this.entityId) || this.entity; // Especifica que client es de tipo Cliente
        if (this.entity) {
          console.log('Cliente cargado:', this.entity);
        } else {
          console.log('Cliente no encontrado.');
        }
      },
      (error: any) => {
        console.error('Error al cargar los clientes:', error);
      }
    );
  }

  navigateBack(): void {
    this.router.navigate(['/clientes']); // Asegúrate de que esta sea la ruta correcta para la lista de clientes
  }

}
