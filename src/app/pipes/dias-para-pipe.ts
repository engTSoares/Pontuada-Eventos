import { Pipe, PipeTransform } from '@angular/core';

const MILISSEGUNDOS_POR_DIA = 24 * 60 * 60 * 1000;

@Pipe({
  name: 'diasPara',
  standalone: true
})
export class DiasParaPipe implements PipeTransform {
  transform(data: string, hoje: Date = new Date()): string {
    if (!data || !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      return '';
    }

    const partes = data.split('-').map(Number);
    const ano = partes[0];
    const mes = partes[1];
    const dia = partes[2];

    if (ano === undefined || mes === undefined || dia === undefined) {
      return '';
    }

    const dataEventoUtc = Date.UTC(ano, mes - 1, dia);
    const dataEventoVerificada = new Date(dataEventoUtc);

    // Impede que datas inexistentes, como 31/02, sejam normalizadas pelo Date.UTC.
    if (
      dataEventoVerificada.getUTCFullYear() !== ano ||
      dataEventoVerificada.getUTCMonth() !== mes - 1 ||
      dataEventoVerificada.getUTCDate() !== dia
    ) {
      return '';
    }

    const hojeUtc = Date.UTC(
      hoje.getFullYear(),
      hoje.getMonth(),
      hoje.getDate()
    );

    const diferencaEmDias = Math.round(
      (dataEventoUtc - hojeUtc) / MILISSEGUNDOS_POR_DIA
    );

    if (diferencaEmDias < 0) {
      return 'Encerrado';
    }

    if (diferencaEmDias === 0) {
      return 'Hoje';
    }

    if (diferencaEmDias === 1) {
      return 'Amanhã';
    }

    return `Faltam ${diferencaEmDias} dias`;
  }
}
