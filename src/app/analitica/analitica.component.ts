import {Component, Inject, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Chart, ChartConfiguration, registerables} from 'chart.js';
import { Oportunidad } from '../models/oportunidad.model';
import { Interaccion } from '../models/interaccion.model';
import { Cliente } from '../models/cliente.model';
import {environment} from '../environments/environments';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-analitica',
  standalone: true,
  imports: [],
  templateUrl: './analitica.component.html',
  styleUrls: ['./analitica.component.css'] // Cambié styleUrl a styleUrls
})
export class AnaliticaComponent implements OnInit {
  clientes: Cliente[] = [];
  oportunidades: Oportunidad[] = [];
  interacciones: Interaccion[] = [];
  private apiApp = environment.apiUrl; // URL base de la API

  constructor(private http: HttpClient, @Inject(DOCUMENT) private document: Document) {
    // Registra los controladores al inicializar el componente
    Chart.register(...registerables);
  }

  ngOnInit() {
    console.log ("Inicializando pagina");
  }

  ngAfterViewInit(): void {
    this.fetchData();
  }
  fetchData(): void {
    let urlServicio = this.apiApp + '/analitica';

    this.http.get(urlServicio).subscribe((data: any) => {
      this.clientes = data.clientes;
      this.oportunidades = data.oportunidades;
      this.interacciones = data.interacciones;

      this.createCharts();
    });
  }

  createCharts(): void {
    this.createPieChart();
    this.createBarChart();
  }

  createPieChart(): void {
    const ctx = document.getElementById('pieChart') as HTMLCanvasElement;

    // Asegúrate de que ctx sea un elemento de canvas válido antes de crear el gráfico
    if (ctx) {
      const config: ChartConfiguration<'pie'> = {
        type: 'pie',
        data: {
          labels: ['Clientes', 'Oportunidades', 'Interacciones'],
          datasets: [{
            label: 'Datos Analíticos',
            data: [
              this.clientes.length,
              this.oportunidades.length,
              this.interacciones.length
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
          },
        }
      };

      new Chart(ctx, config);
    } else {
      console.error('El contexto del canvas no es válido.');
    }
  }

  createBarChart(): void {
    const ctx = document.getElementById('barChart') as HTMLCanvasElement;

    if (ctx) {
      const barConfig: ChartConfiguration<'bar'> = {
        type: 'bar',
        data: {
          labels: ['Clientes', 'Oportunidades', 'Interacciones'],
          datasets: [{
            label: 'Cantidad',
            data: [
              this.clientes.length,
              this.oportunidades.length,
              this.interacciones.length
            ],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      };

      new Chart(ctx, barConfig);
    } else {
      console.error('El contexto del canvas no es válido.');
    }
  }
}
