import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mascaraEmail',
  standalone: true
})
export class MascaraEmailPipe implements PipeTransform {
  transform(email: string | null | undefined): string {
    if (!email) return '';

    const separador = email.lastIndexOf('@');
    if (separador < 2 || separador === email.length - 1) return email;

    const usuario = email.slice(0, separador);
    const dominio = email.slice(separador + 1);
    const quantidadeOculta = Array.from(usuario.slice(2)).length;

    return `${Array.from(usuario).slice(0, 2).join('')}${'*'.repeat(quantidadeOculta)}@${dominio}`;
  }
}
