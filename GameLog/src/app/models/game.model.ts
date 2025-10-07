export type GameStatus = 'Terminado' | 'Tô jogando' | 'Quero jogar';

export interface Game {
  id: string; // UUID ou similar
  title: string;
  platform: string; // Ex: PC, PS5, Switch
  genre: string;
  status: GameStatus;
  progress: number; // Porcentagem de conclusão (0 a 100)
  hoursPlayed?: number;
  startDate?: Date;
  finishDate?: Date;
  rating?: number; // 1 a 5 estrelas
  coverUrl?: string;
  notes?: string;
}