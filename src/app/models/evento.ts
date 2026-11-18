export interface Evento {
  id: number;
  titulo: string;
  descricao: string;
  data: string;            
  local: string;
  emailResponsavel: string;
  vagas: number | null;    
}
