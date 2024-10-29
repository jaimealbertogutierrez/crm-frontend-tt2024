import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InteractionService } from '../../services/interaction.service';
import { Interaccion } from '../../models/interaccion.model'; // Modelo de interacción
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-interacciones-detail',
  templateUrl: './interacciones-detail.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./interacciones-detail.component.css']
})
export class InteraccionesDetailComponent implements OnInit {
  entity: Interaccion = {
    interaccion_id: 0,
    cliente_id: 0,
    fecha_interaccion: new Date(),
    tipo_interaccion: 'llamada', // Valor por defecto
    notas: '',
    documento_adjuntos: undefined
  };

  entityId: number = 0;

  constructor(private router: Router, private actroute: ActivatedRoute, private interaccionService: InteractionService) {}

  ngOnInit(): void {
    this.entityId = +this.actroute.snapshot.paramMap.get('id')!;
    this.loadEntity();
  }

  loadEntity(): void {
    this.interaccionService.getToken().pipe(
      switchMap(authToken => {
        return this.interaccionService.getInteractions(authToken);
      })
    ).subscribe(
      (interacciones: Interaccion[]) => {
        this.entity = interacciones.find((interaccion: Interaccion) => interaccion.interaccion_id === this.entityId) || this.entity;
        if (this.entity) {
          console.log('Interacción cargada:', this.entity);
        } else {
          console.log('Interacción no encontrada.');
        }
      },
      (error: any) => {
        console.error('Error al cargar las interacciones:', error);
      }
    );
  }

  navigateBack(): void {
    this.router.navigate(['/interacciones']);
  }
}
