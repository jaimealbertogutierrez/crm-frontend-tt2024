import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InteractionService } from '../../services/interaction.service';
import { Interaccion } from '../../models/interaccion.model'; // Modelo de interacción
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-interacciones-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './interacciones-edit.component.html',
  styleUrls: ['./interacciones-edit.component.css']
})
export class InteraccionesEditComponent implements OnInit {
  editForm: FormGroup;
  entityId: number = 0;
  message: string | null = null;

  constructor(
    private fb: FormBuilder,
    private interaccionService: InteractionService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editForm = this.fb.group({
      cliente_id: [''],
      fecha_interaccion: [''],
      tipo_interaccion: [''],
      notas: [''],
      documento_adjuntos: [''] // Campo opcional
    });
  }

  ngOnInit(): void {
    this.entityId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEntity();
  }

  loadEntity(): void {
    this.interaccionService.getToken().pipe(
      switchMap(authToken => {
        return this.interaccionService.getInteraccionById(this.entityId, authToken);
      })
    ).subscribe(
      (data:Interaccion) => {
        this.editForm.patchValue(data);
        this.message = 'Interacción cargada correctamente.';
        console.log("Entidad cargada:", this.message);
      },
      (error: any) => {
        console.error('Error al cargar la entidad:', error);
        this.message = 'Error al cargar la interacción. Intenta de nuevo más tarde.';
      }
    );
  }

  onSubmit(): void {

    const formData = this.editForm.value; // Guardamos los valores del formulario en una variable
    const {tipo, descripcion, fecha} = formData; // Desestructuramos la variable
    console.log('Contenido del formulario:', JSON.stringify(formData, null, 2));

    this.interaccionService.getToken().pipe(
      switchMap(authToken => {
        return this.interaccionService.updateInteraccion(this.entityId, formData, authToken);
      })
    ).subscribe(
      () => {
        this.message = 'Interacción actualizada exitosamente.';
        setTimeout(() => this.router.navigate(['/interacciones']), 5000);
      },
      (error: any) => {
        console.error('Error al actualizar la interacción:', error);
        this.message = 'Error al actualizar la interacción. Intenta de nuevo más tarde.';
      }
    );
  }
}
