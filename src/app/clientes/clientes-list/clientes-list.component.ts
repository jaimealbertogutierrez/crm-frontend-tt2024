import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from '../../models/cliente.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { switchMap } from 'rxjs'; // Asegúrate de que la ruta sea correcta

declare var $: any; // Asegúrate de que $ está disponible

@Component({
  selector: 'app-clientes-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent implements OnInit {
  clientess: Cliente[] = [];
  loading = true;
  error = '';
  clientesIdToDelete: number = 0;

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.fetchclientess();
  }

  fetchclientess(): void {
    this.loading = true; // Activa el indicador de carga
    this.clientService.getToken().pipe(
      switchMap(authToken => {
        return this.clientService.getClients(authToken); // Llama a getClients con el token
      })
    ).subscribe(
      (data: Cliente[]) => {
        this.clientess = data; // Asigna los datos a la propiedad clientes
        this.loading = false; // Desactiva el indicador de carga
      },
      error => {
        this.error = 'Error al cargar los clientes'; // Manejo de errores
        this.loading = false; // Desactiva el indicador de carga
        console.error('Error al cargar los clientes:', error);
      }
    );
  }

  viewclientes(id: number): void {
    let enlaceConsulta = '/clientes/' + id;
    this.router.navigate([enlaceConsulta]);
  }

  editclientes(id: number): void {
    let enlaceConsultaM = '/clientes/' + id + '/edit';
    this.router.navigate([enlaceConsultaM]);
  }

  confirmDelete(id: number): void {
    this.clientesIdToDelete = id;
    $('#confirmDeleteModal').modal('show');
  }

  cancelEliminar(): void {
    $('#confirmDeleteModal').modal('hide');
  }

  deleteclientes(): void {
    $('#confirmDeleteModal').modal('hide');

    if (this.clientesIdToDelete !== null) {
      this.loading = true; // Activa el indicador de carga al eliminar

      this.clientService.getToken().pipe(
        switchMap(authToken => {
          return this.clientService.deleteClient(this.clientesIdToDelete, authToken); // Llama a deleteClient con el token
        })
      ).subscribe(
        () => {
          // Filtra la lista de clientes para eliminar el cliente eliminado
          this.clientess = this.clientess.filter(clientes => clientes.cliente_id !== this.clientesIdToDelete);
          $('#confirmDeleteModal').modal('hide'); // Cierra el modal de confirmación
          this.clientesIdToDelete = 0; // Resetea el ID del cliente a eliminar
          this.loading = false; // Desactiva el indicador de carga
        },
        error => {
          this.error = 'Error al eliminar el cliente.  Verifique si el registro tiene relaciones con otras entidades del negocio'; // Manejo de errores
          this.loading = false; // Desactiva el indicador de carga
        }
      );
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/clientes/create']);
  }
}
