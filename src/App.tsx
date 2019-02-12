import * as React from 'react';
import Search from './components/Search';
import Pokemon from './components/Pokemon';
import pokedexImg from './statics/Pokedex.svg';

export interface AppState { pokemonSelected: any }

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { pokemonSelected: '' };
    this.handlePokemonSelected = this.handlePokemonSelected.bind(this);
  }

  handlePokemonSelected(newPokemonSelected: any) {
    this.setState({ pokemonSelected: newPokemonSelected });
  }

  public render() {
    return (
      <div className="App">
        <Search onPokemonSelected={this.handlePokemonSelected} />
        <img src={pokedexImg} className="App-pokedex" />
        { this.state.pokemonSelected != '' && 
          <Pokemon pokemon={this.state.pokemonSelected} />}
      </div>
    );
  }
}

export default App;
