import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OportunidadService } from '../../services/opportunity.service'; // Servicio para oportunidades
import { Oportunidad } from '../../models/oportunidad.model'; // Modelo de oportunidad
import { switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import {Interaccion} from '../../models/interaccion.model';

@Component({
  selector: 'app-oportunidades-detail',
  templateUrl: './oportunidades-detail.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./oportunidades-detail.component.css']
})
export class OportunidadesDetailComponent implements OnInit {
  oportunidad?: Oportunidad;
  entityId: number = 0;

  constructor(private router: Router, private actroute: ActivatedRoute, private oportunidadService: OportunidadService) {}

  ngOnInit(): void {
    this.entityId = +this.actroute.snapshot.paramMap.get('id')!;
    this.loadEntity();
  }

  loadEntity(): void {
    this.oportunidadService.getToken().pipe(
      switchMap(authToken => {
        return this.oportunidadService.getOportunidades(authToken);
      })
    ).subscribe(
      (oportunidades: Oportunidad[]) => {
        this.oportunidad = oportunidades.find((oportunidad: Oportunidad) => oportunidad.oportunidad_id === this.entityId) || this.oportunidad;
        if (this.oportunidad) {
          console.log('Oportunidad cargada:', this.oportunidad);
        } else {
          console.log('Oportunidad no encontrada.');
        }
      },
      (error: any) => {
        console.error('Error al cargar las oportunidades:', error);
      }
    );
  }

  navigateBack(): void {
    this.router.navigate(['/oportunidades']);
  }
}
