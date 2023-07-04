import { Component } from '@angular/core';
import { GetPokemonDataService } from 'src/app/services/get-pokemon-data.service';

interface PokemonDataType {
  name: string;
  url: string;
}

interface PokemonsListType {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonDataType[];
}
@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css'],
})
export class PokemonListComponent {
  constructor(private getPokemonDataService: GetPokemonDataService) {}
  interval = 10;
  localOffset = 0;
  localLimit = 10;
  buttonOff = true;

  loadedData: PokemonsListType = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  ngOnInit() {
    this.getPokemonData(this.localOffset, this.localLimit);
  }

  getPokemonData(offset: number, limit: number) {
    this.getPokemonDataService
      .getPokemonsList(offset, limit)
      .subscribe((resData) => {
        this.loadedData = resData as PokemonsListType;
      });
  }

  next() {
    this.localOffset += this.interval;
    this.getPokemonData(this.localOffset, this.localLimit);
  }

  previous() {
    this.localOffset -= this.interval;
    this.getPokemonData(this.localOffset, this.localLimit);
  }
}
