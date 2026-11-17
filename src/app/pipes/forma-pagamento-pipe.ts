import { Pipe, PipeTransform } from '@angular/core';
import type { FormaPagamento } from '../models/participante';

const ROTULOS: Record<FormaPagamento, string> = {
  Pix: 'Pix',
  Dinheiro: 'Dinheiro',
  'Cartão de crédito': 'Cartão de crédito',
  'Cartão de débito': 'Cartão de débito',
  Transferência: 'Transferência'
};

@Pipe({
  name: 'formaPagamento',
  standalone: true
})
export class FormaPagamentoPipe implements PipeTransform {
  transform(valor: FormaPagamento | '' | null | undefined): string {
    if (!valor) {
      return 'Não informado';
    }

    return ROTULOS[valor] ?? 'Não informado';
  }
}
