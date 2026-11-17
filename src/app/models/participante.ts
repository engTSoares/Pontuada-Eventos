export type FormaPagamento =
  | 'Pix'
  | 'Dinheiro'
  | 'Cartão de crédito'
  | 'Cartão de débito'
  | 'Transferência';

export interface Participante {
  id: number;
  eventoId: number;
  descricao: string;
  email: string;
  telefone: string;
  formaPagamento: FormaPagamento;
}
