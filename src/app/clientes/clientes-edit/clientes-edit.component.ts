import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ClientService } from '../../services/client.service';
import { Cliente } from '../../models/cliente.model';
import {switchMap} from 'rxjs';

@Component({
  selector: 'app-clientes-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes-edit.component.html',
  styleUrls: ['./clientes-edit.component.css']
})
export class ClientesEditComponent implements OnInit {
  editForm: FormGroup;
  entityId: number = 0;
  message: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      nombre: [''],
      direccion: [''],
      correo_electronico: [''],
      telefono: ['']
    });
  }

  ngOnInit(): void {
    this.entityId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEntity();
  }

  loadEntity(): void {

    console.log ("ID ENTIDAD CONSULTAR: " + this.entityId);

    this.clientService.getToken().pipe(
      switchMap(authToken => {
        // Llama a getClientById con el token
        return this.clientService.getClientById(this.entityId, authToken);
      })
    ).subscribe(
      data => {
        // Llama a patchValue para establecer los valores en el formulario
        this.editForm.patchValue(data);
        this.message = 'Cliente cargado correctamente.'; // Mensaje de éxito al cargar
        console.log("Entidad cargada:", this.message);
      },
      (error: any) => {
        console.error('Error al cargar la entidad:', error);
        this.message = 'Error al cargar el cliente. Intenta de nuevo más tarde.'; // Mensaje de error al cargar
      }
    );
  }
  onSubmit(): void {
    this.clientService.getToken().pipe(
      switchMap(authToken => {
        return this.clientService.updateClient(this.entityId, this.editForm.value, authToken); // Llama a updateClient con el token
      })
    ).subscribe(
      () => {
        this.message = 'Cliente modificado exitosamente.'; // Mensaje de éxito al modificar
        console.log("Cliente modificado:", this.message);
        setTimeout(() => this.router.navigate(['/clientes']), 5000); // Redirigir después de 5 segundos
      },
      (error: any) => {
        console.error('Error al modificar la entidad:', error);
        this.message = 'Error al modificar el cliente. Intenta de nuevo más tarde.'; // Mensaje de error al modificar
      }
    );
  }

}
