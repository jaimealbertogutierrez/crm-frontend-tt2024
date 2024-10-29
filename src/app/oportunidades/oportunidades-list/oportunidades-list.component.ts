import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Oportunidad } from '../../models/oportunidad.model'; // Asegúrate de que la ruta sea correcta
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { OportunidadService } from '../../services/opportunity.service';
import { switchMap } from 'rxjs';

declare var $: any; // Asegúrate de que $ está disponible

@Component({
  selector: 'app-oportunidades-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './oportunidades-list.component.html',
  styleUrls: ['./oportunidades-list.component.css']
})
export class OportunidadesListComponent implements OnInit {
  oportunidades: Oportunidad[] = [];
  loading = true;
  error = '';
  oportunidadIdToDelete: number = 0;

  constructor(private oportunidadService: OportunidadService, private router: Router) {}

  ngOnInit(): void {
    this.fetchOportunidades();
  }

  fetchOportunidades(): void {
    this.loading = true;
    this.oportunidadService.getToken().pipe(
      switchMap(authToken => {
        return this.oportunidadService.getOportunidades(authToken);
      })
    ).subscribe(
      (data: Oportunidad[]) => {
        this.oportunidades = data;
        this.loading = false;
      },
      error => {
        this.error = 'Error al cargar las oportunidades';
        this.loading = false;
        console.error('Error al cargar las oportunidades:', error);
      }
    );
  }

  viewOportunidad(id: number): void {
    const enlaceConsulta = `/oportunidades/${id}`;
    this.router.navigate([enlaceConsulta]);
  }

  editOportunidad(id: number): void {
    const enlaceConsultaM = `/oportunidades/${id}/edit`;
    this.router.navigate([enlaceConsultaM]);
  }

  confirmDelete(id: number): void {
    this.oportunidadIdToDelete = id;
    $('#confirmDeleteModal').modal('show');
  }

  cancelEliminar(): void {
    $('#confirmDeleteModal').modal('hide');
  }

  deleteOportunidad(): void {
    $('#confirmDeleteModal').modal('hide');

    if (this.oportunidadIdToDelete !== null) {
      this.loading = true;

      this.oportunidadService.getToken().pipe(
        switchMap(authToken => {
          return this.oportunidadService.deleteOportunidad(this.oportunidadIdToDelete, authToken);
        })
      ).subscribe(
        () => {
          this.oportunidades = this.oportunidades.filter(oportunidad => oportunidad.oportunidad_id !== this.oportunidadIdToDelete);
          $('#confirmDeleteModal').modal('hide');
          this.oportunidadIdToDelete = 0;
          this.loading = false;
        },
        error => {
          this.error = 'Error al eliminar la oportunidad. Verifique si el registro tiene relaciones con otras entidades del negocio';
          this.loading = false;
        }
      );
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/oportunidades/create']);
  }
}
