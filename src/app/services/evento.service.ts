import { Injectable, signal } from '@angular/core';
import { Evento } from '../models/evento';
import { Participante } from '../models/participante';

const CHAVE_EVENTOS = 'agenda-unijorge:eventos';
const CHAVE_PARTICIPANTES = 'agenda-unijorge:participantes';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  private readonly _eventos = signal<Evento[]>(this.carregar<Evento>(CHAVE_EVENTOS));
  private readonly _participantes = signal<Participante[]>(
    this.carregar<Participante>(CHAVE_PARTICIPANTES)
  );

  readonly eventos = this._eventos.asReadonly();
  readonly participantes = this._participantes.asReadonly();

  listarEventos(): Evento[] {
    return this._eventos();
  }

  obterEvento(eventoId: number): Evento | undefined {
    return this._eventos().find(evento => evento.id === eventoId);
  }

  adicionarEvento(dados: Omit<Evento, 'id'>): Evento {
    const proximoId = this.proximoId(this._eventos().map(evento => evento.id));
    const novoEvento: Evento = { ...dados, id: proximoId };

    this._eventos.update(eventos => [...eventos, novoEvento]);
    this.persistir(CHAVE_EVENTOS, this._eventos());

    return novoEvento;
  }

  listarParticipantes(eventoId: number): Participante[] {
    return this._participantes().filter(participante => participante.eventoId === eventoId);
  }

  obterParticipante(eventoId: number, participanteId: number): Participante | undefined {
    return this._participantes().find(
      participante => participante.eventoId === eventoId && participante.id === participanteId
    );
  }

  adicionarParticipante(
    eventoId: number,
    dados: Omit<Participante, 'id' | 'eventoId'>
  ): Participante {
    if (!this.obterEvento(eventoId)) {
      throw new Error('Não foi possível cadastrar o participante: evento não encontrado.');
    }

    const proximoId = this.proximoId(this._participantes().map(item => item.id));
    const novoParticipante: Participante = {
      ...dados,
      id: proximoId,
      eventoId
    };

    this._participantes.update(participantes => [...participantes, novoParticipante]);
    this.persistir(CHAVE_PARTICIPANTES, this._participantes());

    return novoParticipante;
  }

  atualizarParticipante(
    eventoId: number,
    participanteId: number,
    dados: Omit<Participante, 'id' | 'eventoId'>
  ): boolean {
    const existe = this.obterParticipante(eventoId, participanteId);
    if (!existe) return false;

    this._participantes.update(participantes =>
      participantes.map(participante =>
        participante.id === participanteId && participante.eventoId === eventoId
          ? { ...participante, ...dados }
          : participante
      )
    );

    this.persistir(CHAVE_PARTICIPANTES, this._participantes());
    return true;
  }

  excluirParticipante(eventoId: number, participanteId: number): boolean {
    const existe = this.obterParticipante(eventoId, participanteId);
    if (!existe) return false;

    this._participantes.update(participantes =>
      participantes.filter(
        participante =>
          !(participante.id === participanteId && participante.eventoId === eventoId)
      )
    );

    this.persistir(CHAVE_PARTICIPANTES, this._participantes());
    return true;
  }

  private proximoId(ids: number[]): number {
    return ids.length ? Math.max(...ids) + 1 : 1;
  }

  private carregar<T>(chave: string): T[] {
    try {
      if (typeof localStorage === 'undefined') return [];
      const valor = localStorage.getItem(chave);
      if (!valor) return [];

      const dados: unknown = JSON.parse(valor);
      return Array.isArray(dados) ? dados as T[] : [];
    } catch {
      return [];
    }
  }

  private persistir<T>(chave: string, dados: T[]): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(chave, JSON.stringify(dados));
    }
  }
}
