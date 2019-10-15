import * as React from "react";
import { getPokemonMatchingList, getPokemonByName } from '../services/SearcherService';

export interface SearchProps { onPokemonSelected: any }
export interface SearchState { 
    pokemonSearched: string; 
    allPokemonList: object; 
    pokemonMachtingList: any; 
}

const NUMBER_OF_POKEMON = 300;

class Search extends React.Component<SearchProps, SearchState> {
    constructor(props: any) {
        super(props);
        this.state = {
            pokemonSearched: '',
            allPokemonList: [],
            pokemonMachtingList: []
        };

        this.checkIfOptionChosen = this.checkIfOptionChosen.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(): void {
        fetch(`https://pokeapi.co/api/v2/pokemon?limit=`+NUMBER_OF_POKEMON)
            .then((response) => {
                return response.json();
            }).then((json) => {
                console.log(json.results);
                this.setState({ allPokemonList: json.results });
            }).catch((ex) => console.log('Parsing failed', ex))
    }

    checkIfOptionChosen(pokemonSearched: string, pokemonList: any): void {
        for (var i = 0; i < pokemonList.length; i++) {
            if (pokemonList[i].name === pokemonSearched) {
                this.props.onPokemonSelected(getPokemonByName(pokemonSearched, this.state.allPokemonList));
                break;
            }
        }
    }

    handleChange(event: any): void {
        const newPokemonSearched = event.target.value;
        const newPokemonMachtingList = getPokemonMatchingList(newPokemonSearched, this.state.allPokemonList);
        this.checkIfOptionChosen(newPokemonSearched, newPokemonMachtingList);

        this.setState({
            pokemonSearched: newPokemonSearched,
            pokemonMachtingList: newPokemonMachtingList
        });
    }

    render() {
        return (
            <div className="Search">
                <input list="pokemonFound" autoComplete="off"
                    value={this.state.pokemonSearched}
                    onChange={this.handleChange}
                    placeholder="pokemon name" />

                <datalist id="pokemonFound">
                    { this.state.pokemonMachtingList.map((aPokemon: any) => 
                        <option key={aPokemon.name} value={aPokemon.name} />
                    )}
                </datalist>
            </div>
        );
    }
}

export default Search;