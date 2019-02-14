import * as React from 'react';
import Search from './components/Search';
import Pokemon from './components/Pokemon';
import pokedexImg from './statics/Pokedex.svg';

export interface AppState { 
  pokemonSelected: any; 
  animationPlayed: string; 
  blueFlashPlayed: string;
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = { 
      pokemonSelected: '',
      animationPlayed: '',
      blueFlashPlayed: ''
    };
    this.handlePokemonSelected = this.handlePokemonSelected.bind(this);
    this.getAnimationNameWithColor = this.getAnimationNameWithColor.bind(this);
    this.switchBlueFlashPlayed = this.switchBlueFlashPlayed.bind(this);
  }

  handlePokemonSelected(newPokemonSelected: any):void {
    this.setState({ 
      pokemonSelected: newPokemonSelected,
      animationPlayed: 'flash-animation-'
    });
    setTimeout(() => { 
        this.setState({ animationPlayed: '' })
    }, 2500);
  }

  getAnimationNameWithColor(colorName: string): string{
    return (this.state.animationPlayed!='' ? 
            this.state.animationPlayed+colorName : '');
  }

  switchBlueFlashPlayed(): void{
    this.setState({blueFlashPlayed: "flash-animation-blue"});
    setTimeout(() => { this.setState({ blueFlashPlayed: '' })
    }, 2500);
  }

  public render() {
    return (
      <div className="App">
        <Search onPokemonSelected={this.handlePokemonSelected} />
        <img src={pokedexImg} className="Pokedex-bg" />
        <button className={"Pokedex-button"} onClick={this.switchBlueFlashPlayed}/>
        <div className={"Pokedex-light-blue "+this.state.blueFlashPlayed}></div>
        <div className={"Pokedex-light-red "+this.getAnimationNameWithColor("red")}></div>
        <div className={"Pokedex-light-yellow "+this.getAnimationNameWithColor("yellow")}></div>
        <div className={"Pokedex-light-green "+this.getAnimationNameWithColor("green")}></div>
        { this.state.pokemonSelected != '' && 
          <Pokemon pokemon={this.state.pokemonSelected} />}
      </div>
    );
  }
}

export default App;
