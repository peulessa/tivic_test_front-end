import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { TableService } from '../../services/table.service';
import { TableData } from '../../../TableData';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  constructor(private tableService: TableService) {}

  tableData: TableData[] = [];

  ngOnInit(): void {
    this.tableService.getTableData().subscribe((data) => {
      /* this.tableData = data; */
      console.log(data);
    });
  }

  displayedColumns: string[] = [
    'id',
    'data_inversa',
    'dia_semana',
    'horario',
    'uf',
    'br',
    'km',
    'municipio',
    'causa_acidente',
    'tipo_acidente',
    'classificacao_acidente',
    'fase_dia',
    'sentido_via',
    'condicao_metereologica',
    'tipo_pista',
    'tracado_via',
    'uso_solo',
    'pessoas',
    'mortos',
    'feridos_leves',
    'feridos_graves',
    'ilesos',
    'ignorados',
    'feridos',
    'veiculos',
    'latitude',
    'longitude',
    'regional',
    'delegacia',
    'uop',
  ];
}
