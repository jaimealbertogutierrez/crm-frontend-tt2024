import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OportunidadService } from '../../services/opportunity.service';
import { ClientService } from '../../services/client.service';
import { Oportunidad } from '../../models/oportunidad.model';
import { Cliente } from '../../models/cliente.model';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-oportunidades-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './oportunidades-edit.component.html',
  styleUrls: ['./oportunidades-edit.component.css']
})
export class OportunidadesEditComponent implements OnInit {
  editForm: FormGroup;
  entityId: number = 0;
  message: string | null = null;
  clientes: Cliente[] = [];

  constructor(
    private fb: FormBuilder,
    private oportunidadService: OportunidadService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      cliente_id: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      fecha_creacion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.entityId = +this.route.snapshot.paramMap.get('id')!;
    this.loadClientes();
    this.loadEntity();
  }

  loadClientes(): void {
    this.clientService.getToken().pipe(
      switchMap(authToken => this.clientService.getClients(authToken))
    ).subscribe(
      (data: Cliente[]) => {
        this.clientes = data;
      },
      error => {
        console.error('Error al cargar los clientes:', error);
        this.message = 'Error al cargar los clientes. Intenta de nuevo más tarde.';
      }
    );
  }

  loadEntity(): void {
    this.oportunidadService.getToken().pipe(
      switchMap(authToken => this.oportunidadService.getOportunidadById(this.entityId, authToken))
    ).subscribe(
      (data: Oportunidad) => {
        this.editForm.patchValue(data);
        this.message = 'Oportunidad cargada correctamente.';
      },
      error => {
        console.error('Error al cargar la oportunidad:', error);
        this.message = 'Error al cargar la oportunidad. Intenta de nuevo más tarde.';
      }
    );
  }

  onSubmit(): void {
    if (this.editForm.valid) {
      const formData = this.editForm.value;

      this.oportunidadService.getToken().pipe(
        switchMap(authToken => this.oportunidadService.updateOportunidad(this.entityId, formData, authToken))
      ).subscribe(
        () => {
          this.message = 'Oportunidad actualizada exitosamente.';
          setTimeout(() => this.router.navigate(['/oportunidades']), 5000);
        },
        error => {
          console.error('Error al actualizar la oportunidad:', error);
          this.message = 'Error al actualizar la oportunidad. Intenta de nuevo más tarde.';
        }
      );
    } else {
      this.message = 'Por favor, completa todos los campos requeridos.';
    }
  }
}
