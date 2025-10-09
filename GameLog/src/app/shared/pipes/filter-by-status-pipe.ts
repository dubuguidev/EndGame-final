import { Pipe, PipeTransform } from '@angular/core';
import { Game, GameStatus } from '../../models/game.model'; 

@Pipe({
  name: 'filterByStatus',
  standalone: true // É um pipe standalone
})
export class FilterByStatusPipe implements PipeTransform {
  transform(games: Game[] | null, status: GameStatus): Game[] {
    if (!games) {
      return [];
    }
    return games.filter(game => game.status === status);
  }
}