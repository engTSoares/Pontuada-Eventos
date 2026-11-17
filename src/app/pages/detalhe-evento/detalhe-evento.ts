import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Evento } from '../../models/evento';
import { EventoService } from '../../services/evento.service';

@Component({
  selector: 'app-detalhe-evento',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detalhe-evento.html',
  styleUrl: './detalhe-evento.css'
})
export class DetalheEvento {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly eventoService = inject(EventoService);

  readonly eventoId = Number(this.route.snapshot.paramMap.get('id'));
  readonly evento: Evento | undefined = this.eventoService.obterEvento(this.eventoId);

  constructor() {
    if (!Number.isInteger(this.eventoId) || !this.evento) {
      void this.router.navigate(['/eventos/novo']);
    }
  }

  get quantidadeParticipantes(): number {
    return this.eventoService.listarParticipantes(this.eventoId).length;
  }
}
