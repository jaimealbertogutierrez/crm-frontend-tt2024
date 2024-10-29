import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OportunidadService } from '../../services/opportunity.service';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../../models/cliente.model';
import { Oportunidad } from '../../models/oportunidad.model';

@Component({
  selector: 'app-oportunidades-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './oportunidades-create.component.html',
  styleUrls: ['./oportunidades-create.component.css']
})
export class OportunidadesCreateComponent implements OnInit {
  registerForm: FormGroup;
  message: string | null = null;
  clientes: Cliente[] = [];
  isEditMode: boolean = false;
  oportunidadId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private oportunidadService: OportunidadService,
    private clientService: ClientService,
    private route: ActivatedRoute
  ) {
    this.registerForm = this.fb.group({
      cliente_id: ['', Validators.required],
      descripcion: ['', Validators.required],
      estado: ['', Validators.required],
      fecha_creacion: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchClientes();
    this.checkForEdit();
  }

  fetchClientes(): void {
    this.clientService.getToken().pipe(
      switchMap(authToken => {
        return this.clientService.getClients(authToken);
      })
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

  checkForEdit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.oportunidadId = +params['id'];
        this.isEditMode = true;
        this.loadOportunidad();
      }
    });
  }

  loadOportunidad(): void {
    this.oportunidadService.getToken().pipe(
      switchMap(authToken => {
        return this.oportunidadService.getOportunidadById(this.oportunidadId!, authToken);
      })
    ).subscribe(
      (oportunidad: Oportunidad) => {
        this.registerForm.patchValue(oportunidad);
      },
      error => {
        console.error('Error al cargar la oportunidad:', error);
        this.message = 'Error al cargar la oportunidad. Intenta de nuevo más tarde.';
      }
    );
  }

  onSubmit(): void {
    const formData = this.registerForm.value; // Guardamos los valores del formulario en una variable
    const {tipo, descripcion, fecha} = formData; // Desestructuramos la variable

    console.log("------------------------------------------");
    console.log("datos para crear: " + JSON.stringify(formData));
    console.log("------------------------------------------");

    if (this.registerForm.valid) {

      this.clientService.getToken().pipe(
        switchMap(authToken => {
          return this.oportunidadService.createOportunidad(formData, authToken);
        })
      ).subscribe(
        () => {
          this.message = 'Oportunidad creada exitosamente.'; // Mensaje de éxito al modificar
          console.log("Oportunidad creada:", this.message);
          setTimeout(() => this.router.navigate(['/oportunidades']), 5000); // Redirigir después de 5 segundos
        },
        (error: any) => {
          console.error('Error al crear la Oportunidad:', error);
          this.message = 'Error al crear la Oportunidad. Intenta de nuevo más tarde.'; // Mensaje de error al modificar
        }
      );
    } else {
      this.message = 'Por favor, completa todos los campos requeridos.';
    }
  }

}
