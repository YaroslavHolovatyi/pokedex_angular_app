import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-pokemon-grid',
  templateUrl: './pokemon-grid.component.html',
  styleUrls: ['./pokemon-grid.component.css']
})
export class PokemonGridComponent implements OnInit {
  pokemons: any[] = [];
  page = 1;
  totalPokemons:number | undefined;
  pokamon: any;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.getSpec(this.pokemon_first);
    this.getPokemons();
  }
  getPokemons(){
    this.dataService.getPokemons(12, this.page+0)
    .subscribe((response:any) => {
      this.totalPokemons = response.count;
      // this is for seeing the difference i've made before
      response.results.forEach((result: { name: string; }) => {
        this.dataService.getData(result.name)
        .subscribe((uniqResponse: any) => {
          this.pokemons.push(uniqResponse);
          console.log(this.pokemons);
        });
      });
    });
  }

  
  newPage = 12;
  getMorePokemons(){
    this.dataService.getPokemons(12, this.newPage+1)
    .subscribe((response:any) => {
      this.totalPokemons = response.count;
      response.results.forEach((result: { name: string; }) => {
        this.dataService.getData(result.name)
        .subscribe((uniqResponse: any) => {
          this.pokemons.push(uniqResponse);
          console.log(this.newPage)
          this.newPage +=1;
          console.log(typeof(response))
        });
      });
    });
  }
  
  pokemon_first = this.pokemons[0];

  getSpec(pokamon: any){
    this.pokemon_first = pokamon;
    console.log(pokamon)
  }


}
