import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { DetalheEvento } from './detalhe-evento';
import { routes } from '../../app.routes';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';

describe('DetalheEvento', () => {
  let component: DetalheEvento;
  let fixture: ComponentFixture<DetalheEvento>;

  const eventoMock: Evento = {
    id: 1,
    titulo: 'Evento de teste',
    data: '2026-11-20',
    local: 'Auditório',
    emailResponsavel: 'teste@email.com',
    vagas: 120
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheEvento],
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
            listarParticipantes: vi.fn(() => [])
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

    fixture = TestBed.createComponent(DetalheEvento);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});