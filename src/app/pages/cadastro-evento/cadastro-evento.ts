import { DatePipe, DecimalPipe, UpperCasePipe } from '@angular/common';
import { TituloPipe } from '../../pipes/titulo-pipe';
import { ResumoPipe } from '../../pipes/resumo-pipe';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Evento } from '../../models/evento';
import {
  validarTitulo,
  validarData,
  validarLocal,
  validarEmailResponsavel,
  validarVagas
} from '../../models/evento.validacao';
import { EventoService } from '../../services/evento.service';

type CampoEvento = 'titulo' | 'descricao' | 'data' | 'local' | 'emailResponsavel' | 'vagas';

@Component({
  selector: 'app-cadastro-evento',
  standalone: true,
  imports: [FormsModule, RouterLink, DatePipe, DecimalPipe, UpperCasePipe, TituloPipe, ResumoPipe],
  templateUrl: './cadastro-evento.html',
  styleUrl: './cadastro-evento.css'
})
export class CadastroEvento {
  private readonly eventoService = inject(EventoService);

  evento: Evento = this.criarEventoVazio();

  tocado: Record<CampoEvento, boolean> = {
    titulo: false,
    descricao: false,
    data: false,
    local: false,
    emailResponsavel: false,
    vagas: false
  };

  erros: Record<CampoEvento, string | null> = {
    titulo: null,
    descricao: null,
    data: null,
    local: null,
    emailResponsavel: null,
    vagas: null
  };

  get eventos(): Evento[] {
    return this.eventoService.listarEventos();
  }

  readonly locaisDisponiveis: string[] = [
    'Auditório',
    'Laboratório 1',
    'Laboratório 2',
    'Sala 101'
  ];

  criarEventoVazio(): Evento {
    return {
      id: 0,
      titulo: '',
      descricao: '',
      data: '',
      local: '',
      emailResponsavel: '',
      vagas: null
    };
  }

  validarCampo(campo: CampoEvento): void {
    switch (campo) {
      case 'titulo':
        this.erros.titulo = validarTitulo(this.evento.titulo);
        break;
      case 'descricao':
        this.erros.descricao = this.evento.descricao.trim() ? null : 'A descrição não pode ficar em branco.';
        break;
      case 'data':
        this.erros.data = validarData(this.evento.data);
        break;
      case 'local':
        this.erros.local = validarLocal(this.evento.local);
        break;
      case 'emailResponsavel':
        this.erros.emailResponsavel = validarEmailResponsavel(this.evento.emailResponsavel);
        break;
      case 'vagas':
        this.erros.vagas = validarVagas(this.evento.vagas);
        break;
    }
  }

  aoSairCampo(campo: CampoEvento): void {
    this.tocado[campo] = true;
    this.validarCampo(campo);
  }

  aoAlterarCampo(campo: CampoEvento): void {
    if (this.tocado[campo]) {
      this.validarCampo(campo);
    }
  }

  formularioValido(): boolean {
    return (
      validarTitulo(this.evento.titulo) === null &&
      this.evento.descricao.trim().length > 0 &&
      validarData(this.evento.data) === null &&
      validarLocal(this.evento.local) === null &&
      validarEmailResponsavel(this.evento.emailResponsavel) === null &&
      validarVagas(this.evento.vagas) === null
    );
  }

  salvar(): void {
    if (!this.formularioValido()) return;

    const dadosEvento = {
      titulo: this.evento.titulo,
      descricao: this.evento.descricao.trim(),
      data: this.evento.data,
      local: this.evento.local,
      emailResponsavel: this.evento.emailResponsavel,
      vagas: this.evento.vagas
    };
    this.eventoService.adicionarEvento(dadosEvento);
    this.limparFormulario();
  }

  limparFormulario(): void {
    this.evento = this.criarEventoVazio();
    this.tocado = {
      titulo: false,
      descricao: false,
      data: false,
      local: false,
      emailResponsavel: false,
      vagas: false
    };
    this.erros = {
      titulo: null,
      descricao: null,
      data: null,
      local: null,
      emailResponsavel: null,
      vagas: null
    };
  }
}
