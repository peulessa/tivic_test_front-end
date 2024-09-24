import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import * as L from 'leaflet';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-map-page',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    RouterLink,
    RouterOutlet,
  ],
  templateUrl: './map-page.component.html',
  styleUrls: ['./map-page.component.css'],
})
export class MapPageComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getUfAcidente().subscribe((data) => {
      const map = L.map('map').setView([-14.235, -51.9253], 4);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const estados: {
        nome: string;
        coordenadas: [number, number];
        uf: string;
        totalAcidentes?: number;
      }[] = [
        { nome: 'Acre', coordenadas: [-9.0238, -70.812], uf: 'AC' },
        { nome: 'Alagoas', coordenadas: [-9.5713, -36.782], uf: 'AL' },
        { nome: 'Amapá', coordenadas: [0.902, -52.003], uf: 'AP' },
        { nome: 'Amazonas', coordenadas: [-3.4168, -65.8561], uf: 'AM' },
        { nome: 'Bahia', coordenadas: [-12.5797, -41.7007], uf: 'BA' },
        { nome: 'Ceará', coordenadas: [-5.4984, -39.3206], uf: 'CE' },
        {
          nome: 'Distrito Federal',
          coordenadas: [-15.7998, -47.8645],
          uf: 'DF',
        },
        { nome: 'Espírito Santo', coordenadas: [-19.1834, -40.3089], uf: 'ES' },
        { nome: 'Goiás', coordenadas: [-15.827, -49.8362], uf: 'GO' },
        { nome: 'Maranhão', coordenadas: [-4.9609, -45.2744], uf: 'MA' },
        { nome: 'Mato Grosso', coordenadas: [-12.6819, -56.9211], uf: 'MT' },
        {
          nome: 'Mato Grosso do Sul',
          coordenadas: [-20.7722, -54.7852],
          uf: 'MS',
        },
        { nome: 'Minas Gerais', coordenadas: [-18.5122, -44.555], uf: 'MG' },
        { nome: 'Pará', coordenadas: [-3.4168, -52.215], uf: 'PA' },
        { nome: 'Paraíba', coordenadas: [-7.239, -36.782], uf: 'PB' },
        { nome: 'Paraná', coordenadas: [-24.891, -51.192], uf: 'PR' },
        { nome: 'Pernambuco', coordenadas: [-8.8137, -36.9541], uf: 'PE' },
        { nome: 'Piauí', coordenadas: [-7.7183, -42.7289], uf: 'PI' },
        { nome: 'Rio de Janeiro', coordenadas: [-22.9068, -43.1729], uf: 'RJ' },
        {
          nome: 'Rio Grande do Norte',
          coordenadas: [-5.7945, -36.354],
          uf: 'RN',
        },
        {
          nome: 'Rio Grande do Sul',
          coordenadas: [-30.0346, -51.2177],
          uf: 'RS',
        },
        { nome: 'Rondônia', coordenadas: [-11.5057, -63.5806], uf: 'RO' },
        { nome: 'Roraima', coordenadas: [2.7376, -62.0751], uf: 'RR' },
        { nome: 'Santa Catarina', coordenadas: [-27.2423, -50.2189], uf: 'SC' },
        { nome: 'São Paulo', coordenadas: [-23.5505, -46.6333], uf: 'SP' },
        { nome: 'Sergipe', coordenadas: [-10.5741, -37.3857], uf: 'SE' },
        { nome: 'Tocantins', coordenadas: [-10.1753, -48.2982], uf: 'TO' },
      ];

      data.forEach((element: { uf: string; totalAcidentes: number }) => {
        const estado = estados.find((e) => e.uf === element.uf);
        if (estado) {
          estado.totalAcidentes = element.totalAcidentes;
        }
      });

      estados.forEach((estado) => {
        const size = this.calcMarkerSize(estado.totalAcidentes || 0);
        const color = this.calcMarkerColor(estado.totalAcidentes || 0);
        const circle = L.circle(estado.coordenadas, {
          color: color,
          fillColor: color,
          fillOpacity: 0.2,
          radius: size * 1000,
        }).addTo(map);
        circle.bindPopup(
          `${estado.nome}<br>Total de Acidentes: ${estado.totalAcidentes || 0}`
        );
      });
    });
  }

  private calcMarkerSize(totalAcidentes: number): number {
    if (totalAcidentes < 500) {
      console.log('Menor que 500');
      return 50;
    } else if (totalAcidentes < 2000) {
      console.log('Menor que 2000');
      return 100;
    } else if (totalAcidentes < 5000) {
      console.log('Menor que 5000');
      return 150;
    } else {
      console.log('Maior ou igual a 5000');
      return 200;
    }
  }

  private calcMarkerColor(totalAcidentes: number): string {
    if (totalAcidentes < 1000) {
      return 'blue';
    } else if (totalAcidentes < 3000) {
      return 'yellow';
    } else if (totalAcidentes < 5000) {
      return 'orange';
    } else {
      return 'red';
    }
  }
}
