export interface TableData {
  /*   uf: string;
  cidade: string;
  tipoAcidente: string;
  causa: string;
  data: Date;
  hora: Date;
  numeroDeVítimas: number; */

  id: number;
  clienteId: number;
  categoria: string;
  dataRecebimento: string;
  metodoPagamento: string;
  valor: number;
  descricao: string;
  contaAReceberId: void;
  contratoId: void;
  createdAt: string;
  updatedAt: string;
  deletedAt: void;
}
