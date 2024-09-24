import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatCardModule,
    BaseChartDirective,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css',
})
export class DashboardPageComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCausaAcidente().subscribe((data) => {
      this.pieChartLabels = [];
      this.pieChartDatasets[0].data = [];

      data.forEach((element: any) => {
        this.pieChartLabels.push(element.causaAcidente);
        this.pieChartDatasets[0].data.push(element.count);
      });
    });

    this.apiService.getAcidentePorMes().subscribe((data) => {
      const totalAcidentes: number[] = [];
      const totalMortes: number[] = [];

      data.forEach((element: any) => {
        totalAcidentes.push(element.totalAcidentes);
        totalMortes.push(element.totalMortes);
      });

      this.barChartData.datasets[0].data = totalAcidentes;
      this.barChartData.datasets[1].data = totalMortes;

      if (this.chart) {
        this.chart.update();
      }
    });

    this.apiService.getResumo().subscribe((data) => {
      this.acidentes = data.totalAcidentes;
      this.feridos_leves = data.totalFeridosLeves;
      this.feridos_graves = data.totalFeridosGraves;
      this.mortos = data.totalMortos;
    });
  }

  acidentes: number = 0;
  feridos_leves: number = 0;
  feridos_graves: number = 0;
  mortos: number = 0;

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: 'white',
          boxWidth: 10,
          padding: 20,
          usePointStyle: true,
        },
        align: 'center',
        fullSize: true,
      },
      title: {
        display: true,
        text: 'Principais Causas de Acidentes',
        color: 'white',
        font: {
          size: 20,
        },
      },
    },
  };
  public pieChartLabels: string[] = [];
  public pieChartDatasets = [
    {
      data: [] as number[],
      backgroundColor: [
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(199, 199, 199, 0.2)',
        'rgba(83, 102, 255, 0.2)',
        'rgba(255, 99, 71, 0.2)',
        'rgba(60, 179, 113, 0.2)',
        'rgba(255, 140, 0, 0.2)',
        'rgba(106, 90, 205, 0.2)',
        'rgba(255, 215, 0, 0.2)',
        'rgba(0, 191, 255, 0.2)',
        'rgba(255, 20, 147, 0.2)',
        'rgba(144, 238, 144, 0.2)',
        'rgba(210, 105, 30, 0.2)',
        'rgba(123, 104, 238, 0.2)',
        'rgba(255, 228, 181, 0.2)',
        'rgba(0, 255, 127, 0.2)',
        'rgba(70, 130, 180, 0.2)',
        'rgba(255, 105, 180, 0.2)',
        'rgba(32, 178, 170, 0.2)',
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(199, 199, 199, 1)',
        'rgba(83, 102, 255, 1)',
        'rgba(255, 99, 71, 1)',
        'rgba(60, 179, 113, 1)',
        'rgba(255, 140, 0, 1)',
        'rgba(106, 90, 205, 1)',
        'rgba(255, 215, 0, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(255, 20, 147, 1)',
        'rgba(144, 238, 144, 1)',
        'rgba(210, 105, 30, 1)',
        'rgba(123, 104, 238, 1)',
        'rgba(255, 228, 181, 1)',
        'rgba(0, 255, 127, 1)',
        'rgba(70, 130, 180, 1)',
        'rgba(255, 105, 180, 1)',
        'rgba(32, 178, 170, 1)',
      ],
      borderWidth: 1,
      hoverBackgroundColor: [
        'rgba(54, 162, 235, 0.4)',
        'rgba(255, 99, 132, 0.4)',
        'rgba(255, 206, 86, 0.4)',
        'rgba(75, 192, 192, 0.4)',
        'rgba(153, 102, 255, 0.4)',
        'rgba(255, 159, 64, 0.4)',
        'rgba(199, 199, 199, 0.4)',
        'rgba(83, 102, 255, 0.4)',
        'rgba(255, 99, 71, 0.4)',
        'rgba(60, 179, 113, 0.4)',
        'rgba(255, 140, 0, 0.4)',
        'rgba(106, 90, 205, 0.4)',
        'rgba(255, 215, 0, 0.4)',
        'rgba(0, 191, 255, 0.4)',
        'rgba(255, 20, 147, 0.4)',
        'rgba(144, 238, 144, 0.4)',
        'rgba(210, 105, 30, 0.4)',
        'rgba(123, 104, 238, 0.4)',
        'rgba(255, 228, 181, 0.4)',
        'rgba(0, 255, 127, 0.4)',
        'rgba(70, 130, 180, 0.4)',
        'rgba(255, 105, 180, 0.4)',
        'rgba(32, 178, 170, 0.4)',
      ],
      hoverBorderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(255, 99, 132, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(199, 199, 199, 1)',
        'rgba(83, 102, 255, 1)',
        'rgba(255, 99, 71, 1)',
        'rgba(60, 179, 113, 1)',
        'rgba(255, 140, 0, 1)',
        'rgba(106, 90, 205, 1)',
        'rgba(255, 215, 0, 1)',
        'rgba(0, 191, 255, 1)',
        'rgba(255, 20, 147, 1)',
        'rgba(144, 238, 144, 1)',
        'rgba(210, 105, 30, 1)',
        'rgba(123, 104, 238, 1)',
        'rgba(255, 228, 181, 1)',
        'rgba(0, 255, 127, 1)',
        'rgba(70, 130, 180, 1)',
        'rgba(255, 105, 180, 1)',
        'rgba(32, 178, 170, 1)',
      ],
    },
  ];
  public pieChartLegend = true;
  public pieChartPlugins = [];

  //Bar
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [
      'JAN',
      'FEV',
      'MAR',
      'ABR',
      'MAI',
      'JUN',
      'JUL',
      'AGO',
      'SET',
      'OUT',
      'NOV',
      'DEZ',
    ],
    datasets: [
      {
        data: [],
        label: 'Acidentes',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.4)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
      },
      {
        data: [],
        label: 'Vítimas',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 0.4)',
        hoverBorderColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    scales: {
      x: {
        ticks: {
          color: 'white',
        },
      },
      y: {
        ticks: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
      title: {
        display: true,
        text: 'Acidentes e Vítimas por Mês',
        color: 'white',
        font: {
          size: 20,
        },
      },
    },
  };
}
