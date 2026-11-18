import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { Participantes } from './participantes';
import { routes } from '../../app.routes';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';

describe('Participantes', () => {
  let component: Participantes;
  let fixture: ComponentFixture<Participantes>;

  const eventoMock: Evento = {
    id: 1,
    titulo: 'Evento de teste',
    descricao: 'Descrição do evento de teste',
    data: '2026-11-20',
    local: 'Auditório',
    emailResponsavel: 'teste@email.com',
    vagas: 120
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Participantes],
      providers: [
        provideRouter(routes),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },
        {
          provide: EventoService,
          useValue: {
            obterEvento: vi.fn(() => eventoMock),
            listarParticipantes: vi.fn(() => []),
            adicionarParticipante: vi.fn(),
            atualizarParticipante: vi.fn(),
            excluirParticipante: vi.fn()
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: vi.fn()
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Participantes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});