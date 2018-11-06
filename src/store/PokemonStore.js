import { observable, computed, decorate } from "mobx";

export class PokemonStore {
    pokemons = [];
    loaded = false;
    itemsPerPage = 10;
    currentPage = 1;
    searchText = "";

  get generatePokemons() {
    for (let i = 1; i < 500; i++) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        .then(res => res.json())
        .then(res => {
          this.loaded = true;
          this.pokemons.push(res);
          return this.pokemons;
        });
    }
    return this.pokemons;
  }

  get filteredPokemons() {
    return this.generatePokemons.slice().filter(item => {
      return (
        item.name.toLowerCase().indexOf(this.searchText.toLowerCase()) !== -1 ||
        !this.searchText
      );
    });
  }

  get fetchPokemons() {
    let indexOfLastPokemon = this.currentPage * this.itemsPerPage;
    let indexOfFirstPokemon = indexOfLastPokemon - this.itemsPerPage;
    return this.filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
  }

  get fetchPageNum() {
    let pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.pokemons.length / this.itemsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }
}

decorate(PokemonStore, {
    pokemons: observable,
    loaded: observable,
    itemsPerPage: observable,
    currentPage: observable,
    searchText: observable,
    generatePokemons: computed,
    filteredPokemons: computed,
    fetchPokemons: computed,
    fetchPageNum: computed
})

export default new PokemonStore();
