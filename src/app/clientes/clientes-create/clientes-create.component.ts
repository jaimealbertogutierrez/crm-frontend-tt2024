import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { CommonModule } from '@angular/common';
import {switchMap} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-clientes-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes-create.component.html',
  styleUrls: ['./clientes-create.component.css']
})
export class ClientesCreateComponent implements OnInit {
  registerForm: FormGroup;
  message: string | null = null; // Propiedad para almacenar el mensaje de resultado

  constructor(private fb: FormBuilder, private router: Router, private clientService: ClientService) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      direccion: ['', Validators.required],
      correo_electronico: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const formData = this.registerForm.value; // Guardamos los valores del formulario en una variable
    const {nombre, direccion, correo_electronico, telefono} = formData; // Desestructuramos la variable

    console.log("------------------------------------------");
    console.log("datos para crear: " + formData);
    console.log("------------------------------------------");

    if (this.registerForm.valid) {

      this.clientService.getToken().pipe(
        switchMap(authToken => {
          return this.clientService.createCliente(formData, authToken);
        })
      ).subscribe(
        () => {
          this.message = 'Cliente creado exitosamente.'; // Mensaje de éxito al modificar
          console.log("Cliente creado:", this.message);
          setTimeout(() => this.router.navigate(['/clientes']), 5000); // Redirigir después de 5 segundos
        },
        (error: any) => {
          console.error('Error al crear la entidad:', error);
          this.message = 'Error al crear el cliente. Intenta de nuevo más tarde.'; // Mensaje de error al modificar
        }
      );

    } else {
      this.message = 'Por favor, completa todos los campos requeridos.';
    }
  }//Fin del método

}
