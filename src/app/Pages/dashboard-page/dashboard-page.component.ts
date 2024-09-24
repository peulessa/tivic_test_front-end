import { Component, OnInit } from '@angular/core';
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

      this.barChartData.datasets = [
        { data: totalAcidentes, label: 'Total Acidentes' },
        { data: totalMortes, label: 'Total Mortes' },
      ];
    });
  }

  title = 'ng2-charts-demo';

  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels: string[] = [];
  public pieChartDatasets = [
    {
      data: [] as number[],
      backgroundColor: [
        '#FF5733',
        '#33FF57',
        '#3357FF',
        '#F1C40F',
        '#8E44AD',
        '#E74C3C',
        '#3498DB',
        '#2ECC71',
        '#E67E22',
        '#1ABC9C',
        '#F39C12',
        '#C0392B',
        '#D35400',
        '#9B59B6',
        '#2980B9',
        '#27AE60',
        '#F1C40F',
        '#34495E',
        '#8E44AD',
        '#E67E22',
        '#D35400',
        '#2C3E50',
        '#7F8C8D',
        '#F39C12',
        '#C0392B',
        '#16A085',
      ],
    },
  ];
  public pieChartLegend = false;
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
    datasets: [],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };
}
