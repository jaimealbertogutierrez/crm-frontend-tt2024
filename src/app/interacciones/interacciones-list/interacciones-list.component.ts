import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Interaccion } from '../../models/interaccion.model'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { InteractionService } from '../../services/interaction.service';
import { switchMap } from 'rxjs';

declare var $: any; // Asegúrate de que $ está disponible

@Component({
  selector: 'app-interacciones-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './interacciones-list.component.html',
  styleUrls: ['./interacciones-list.component.css']
})
export class InteraccionesListComponent implements OnInit {
  interacciones: Interaccion[] = [];
  loading = true;
  error = '';
  interaccionesIdToDelete: number = 0;

  constructor(private interaccionService: InteractionService, private router: Router) {}

  ngOnInit(): void {
    this.fetchInteracciones();
  }

  fetchInteracciones(): void {
    this.loading = true;
    this.interaccionService.getToken().pipe(
      switchMap(authToken => {
        return this.interaccionService.getInteractions(authToken);
      })
    ).subscribe(
      (data: Interaccion[]) => {
        this.interacciones = data;
        this.loading = false;
      },
      error => {
        this.error = 'Error al cargar las interacciones';
        this.loading = false;
        console.error('Error al cargar las interacciones:', error);
      }
    );
  }

  viewInteraccion(id: number): void {
    let enlaceConsulta = '/interacciones/' + id;
    this.router.navigate([enlaceConsulta]);
  }

  editInteraccion(id: number): void {
    let enlaceConsultaM = '/interacciones/' + id + '/edit';
    this.router.navigate([enlaceConsultaM]);
  }

  confirmDelete(id: number): void {
    this.interaccionesIdToDelete = id;
    $('#confirmDeleteModal').modal('show');
  }

  cancelEliminar(): void {
    $('#confirmDeleteModal').modal('hide');
  }

  deleteInteraccion(): void {
    $('#confirmDeleteModal').modal('hide');

    if (this.interaccionesIdToDelete !== null) {
      this.loading = true;

      this.interaccionService.getToken().pipe(
        switchMap(authToken => {
          return this.interaccionService.deleteInteraction(this.interaccionesIdToDelete, authToken);
        })
      ).subscribe(
        () => {
          this.interacciones = this.interacciones.filter(interaccion => interaccion.interaccion_id !== this.interaccionesIdToDelete);
          $('#confirmDeleteModal').modal('hide');
          this.interaccionesIdToDelete = 0;
          this.loading = false;
        },
        error => {
          this.error = 'Error al eliminar la interacción. Verifique si el registro tiene relaciones con otras entidades del negocio';
          this.loading = false;
        }
      );
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/interacciones/create']);
  }
}
