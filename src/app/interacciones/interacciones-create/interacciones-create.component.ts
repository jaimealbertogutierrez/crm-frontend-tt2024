import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InteractionService } from '../../services/interaction.service'; // Servicio para interacciones
import { ClientService } from '../../services/client.service'; // Servicio para clientes
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../../models/cliente.model'; // Asegúrate de que la ruta sea correcta
import { Interaccion } from '../../models/interaccion.model'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-interacciones-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './interacciones-create.component.html',
  styleUrls: ['./interacciones-create.component.css']
})
export class InteraccionesCreateComponent implements OnInit {
  registerForm: FormGroup;
  message: string | null = null;
  clientes: Cliente[] = []; // Nuevo arreglo para almacenar clientes
  isEditMode: boolean = false; // Flag para determinar si estamos en modo edición
  interaccionId: number | null = null; // ID de la interacción a editar

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private interaccionService: InteractionService,
    private clientService: ClientService, // Servicio para clientes
    private route: ActivatedRoute // Para obtener parámetros de la ruta
  ) {
    this.registerForm = this.fb.group({
      cliente_id: ['', Validators.required],
      fecha_interaccion: ['', Validators.required],
      tipo_interaccion: ['', Validators.required],
      notas: ['', Validators.required],
      documento_adjuntos: [''] // Campo opcional
    });
  }

  ngOnInit(): void {
    this.fetchClientes(); // Obtener clientes al inicializar
    this.checkForEdit(); // Verificar si se está editando una interacción
  }

  fetchClientes(): void { // Método para obtener clientes
    this.clientService.getToken().pipe(
      switchMap(authToken => {
        return this.clientService.getClients(authToken); // Llama a getClients con el token
      })
    ).subscribe(
      (data: Cliente[]) => {
        this.clientes = data; // Asigna los datos a la propiedad clientes
      },
      error => {
        console.error('Error al cargar los clientes:', error);
        this.message = 'Error al cargar los clientes. Intenta de nuevo más tarde.';
      }
    );
  }

  checkForEdit(): void { // Método para verificar si estamos en modo edición
    this.route.params.subscribe(params => {
      if (params['id']) { // Si hay un parámetro ID en la ruta
        this.interaccionId = +params['id']; // Convertir a número
        this.isEditMode = true; // Cambiar a modo edición
        this.loadInteraccion(); // Cargar la interacción a editar
      }
    });
  }

  loadInteraccion(): void { // Método para cargar la interacción a editar
    this.interaccionService.getToken().pipe(
      switchMap(authToken => {
        return this.interaccionService.getInteraccionById(this.interaccionId!, authToken); // Cambia a tu método para obtener una interacción
      })
    ).subscribe(
      (interaccion: Interaccion) => {
        this.registerForm.patchValue(interaccion); // Llenar el formulario con los datos de la interacción
      },
      error => {
        console.error('Error al cargar la interacción:', error);
        this.message = 'Error al cargar la interacción. Intenta de nuevo más tarde.';
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
          return this.interaccionService.createInteraccion(formData, authToken);
        })
      ).subscribe(
        () => {
          this.message = 'Interacción creada exitosamente.'; // Mensaje de éxito al modificar
          console.log("Interacción creada:", this.message);
          setTimeout(() => this.router.navigate(['/interacciones']), 5000); // Redirigir después de 5 segundos
        },
        (error: any) => {
          console.error('Error al crear la Interacción:', error);
          this.message = 'Error al crear la Interacción. Intenta de nuevo más tarde.'; // Mensaje de error al modificar
        }
      );
    } else {
      this.message = 'Por favor, completa todos los campos requeridos.';
    }
  }

}
