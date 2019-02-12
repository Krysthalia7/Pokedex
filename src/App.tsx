import * as React from 'react';
import Search from './components/Search';
import Pokemon from './components/Pokemon';
import pokedexImg from './statics/Pokedex.svg';

export interface AppState { pokemonSelected: any, animationPlayed: string }

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { 
      pokemonSelected: '',
      animationPlayed: ''
    };
    this.handlePokemonSelected = this.handlePokemonSelected.bind(this);
  }

  handlePokemonSelected(newPokemonSelected: any) {
    this.setState({ 
      pokemonSelected: newPokemonSelected,
      animationPlayed: 'flash-animation'
    });
    setTimeout(() => { 
        this.setState({ animationPlayed: '' })
    }, 2550);
  }

  public render() {
    return (
      <div className="App">
        <Search onPokemonSelected={this.handlePokemonSelected} />
        <img src={pokedexImg} className="App-pokedex" />
        <div className={"App-pokedex-light "+this.state.animationPlayed}></div>
        { this.state.pokemonSelected != '' && 
          <Pokemon pokemon={this.state.pokemonSelected} />}
      </div>
    );
  }
}

export default App;
