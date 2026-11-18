
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { DiasParaPipe } from '../../pipes/dias-para-pipe';
import { MascaraEmailPipe } from '../../pipes/mascara-email-pipe';
import { FormaPagamentoPipe } from '../../pipes/forma-pagamento-pipe';
import { IniciaisPipe } from '../../pipes/iniciais-pipe';
import { TelefonePipe } from '../../pipes/telefone-pipe';

import { Evento } from '../../models/evento';
import { FormaPagamento, Participante } from '../../models/participante';
import { EventoService } from '../../services/evento.service';

type DadosParticipante = Omit<Participante, 'id' | 'eventoId'>;

@Component({
  selector: 'app-participantes',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    TelefonePipe,
    FormaPagamentoPipe,
    IniciaisPipe,
    DiasParaPipe,
    MascaraEmailPipe
  ],
  templateUrl: './participantes.html',
  styleUrl: './participantes.css'
})
export class Participantes {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly eventoService = inject(EventoService);

  readonly eventoId = Number(this.route.snapshot.paramMap.get('id'));
  readonly evento: Evento | undefined =
    this.eventoService.obterEvento(this.eventoId);

  readonly formasPagamento: FormaPagamento[] = [
    'Pix',
    'Dinheiro',
    'Cartão de crédito',
    'Cartão de débito',
    'Transferência'
  ];

  formulario: DadosParticipante = this.formularioVazio();
  participanteEmEdicao: number | null = null;
  mensagemErro = '';

  ultimoTelefoneValido = '';

  constructor() {
    if (!Number.isInteger(this.eventoId) || !this.evento) {
      void this.router.navigate(['/eventos/novo']);
    }
  }

  get participantes(): Participante[] {
    return this.eventoService.listarParticipantes(this.eventoId);
  }

  formularioVazio(): DadosParticipante {
    return {
      descricao: '',
      email: '',
      telefone: '',
      formaPagamento: 'Pix'
    };
  }

  atualizarTelefone(valor: string): void {
    const digitos = valor.replace(/\D/g, '');

    // Rejeita entradas com mais de 11 dígitos.
    if (digitos.length > 11) {
      this.formulario.telefone = this.ultimoTelefoneValido;
      this.mensagemErro = 'Insira um número válido de telefone.';
      return;
    }

    this.mensagemErro = '';

    let telefoneFormatado = '';

    if (digitos.length === 0) {
      telefoneFormatado = '';
    } else if (digitos.length <= 2) {
      telefoneFormatado = `(${digitos}`;
    } else if (digitos.length <= 7) {
      telefoneFormatado = `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
    } else {
      telefoneFormatado =
        `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7, 11)}`;
    }

    this.formulario.telefone = telefoneFormatado;
    this.ultimoTelefoneValido = telefoneFormatado;
  }

  salvar(): void {
    this.mensagemErro = '';

    const dados: DadosParticipante = {
      descricao: this.formulario.descricao.trim(),
      email: this.formulario.email.trim(),
      telefone: this.formulario.telefone.trim(),
      formaPagamento: this.formulario.formaPagamento
    };

    if (!dados.descricao || !dados.email || !dados.telefone || !dados.formaPagamento) {
      this.mensagemErro = 'Preencha todos os campos obrigatórios.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(dados.email)) {
      this.mensagemErro = 'Informe um e-mail válido.';
      return;
    }

    if (this.participanteEmEdicao === null) {
      this.eventoService.adicionarParticipante(this.eventoId, dados);
    } else {
      const atualizado = this.eventoService.atualizarParticipante(
        this.eventoId,
        this.participanteEmEdicao,
        dados
      );

      if (!atualizado) {
        this.mensagemErro = 'Não foi possível localizar o participante para edição.';
        return;
      }
    }

    this.cancelarEdicao();
  }

  editar(participante: Participante): void {
    this.participanteEmEdicao = participante.id;

    this.formulario = {
      descricao: participante.descricao,
      email: participante.email,
      telefone: participante.telefone,
      formaPagamento: participante.formaPagamento
    };

    this.ultimoTelefoneValido = participante.telefone;
    this.mensagemErro = '';
  }

  excluir(participante: Participante): void {
    const confirmar = confirm(
      `Deseja realmente excluir "${participante.descricao}"?`
    );

    if (!confirmar) return;

    this.eventoService.excluirParticipante(this.eventoId, participante.id);

    if (this.participanteEmEdicao === participante.id) {
      this.cancelarEdicao();
    }
  }

  cancelarEdicao(): void {
    this.formulario = this.formularioVazio();
    this.participanteEmEdicao = null;
    this.ultimoTelefoneValido = '';
    this.mensagemErro = '';
  }
}
