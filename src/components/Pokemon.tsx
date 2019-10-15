import * as React from "react";
import { extractObjectFromObj, extractTypesFromObj } from '../services/ExtractorService';
import Statistics from './Statistics';

export type Pokemon = {
    id: number
    url: string
    name: string
    image: string
    pokemonType: Array<object>
    pokemonStats: Array<object>
};

export interface PokemonProps { pokemon: Pokemon }

export interface PokemonState { 
    id: number;
    myPicture: string;
    myTypes: Array<object>; 
    myStats: Array<object>; 
}

class PokemonComponent extends React.Component<PokemonProps, PokemonState> {
    constructor(props: PokemonProps) {
        super(props);
        this.state = {
            id: 0,
            myPicture: '',
            myTypes: [],
            myStats: []
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount(): void { this.fetchData(this.props.pokemon.url); }
    componentDidUpdate(prevProps: PokemonProps): void {
        const newProps = this.props.pokemon;
        if (newProps !== prevProps.pokemon) {
            this.fetchData(newProps.url);
        }
    }

    fetchData(url: any): void {
        fetch(this.props.pokemon.url)
            .then((response) => {
                return response.json();
            }).then((pokemon) => {
                this.setState({
                    id: pokemon.id,
                    myPicture: pokemon.sprites.front_default,
                    myTypes: extractObjectFromObj(pokemon.types, []),
                    myStats: extractObjectFromObj(pokemon.stats, [])
                })
            }).catch((ex) => console.log('Parsing failed for pokemon url', ex));
    }

    render() {
        return (
            <div className="Pokedex">

                <div className="Pokedex-left">
                    <img src={this.state.myPicture}
                        alt={this.props.pokemon.name+"'s picture"} /> 
                    <div className="Pokemon-name">
                        <h2>#{this.state.id}</h2>
                        <h1>{this.props.pokemon.name}</h1>
                    </div>
                </div>

                <div className="Pokedex-right">
                    <Statistics myTypes={this.state.myTypes} myStats={this.state.myStats} />

                    {this.state.myTypes && extractTypesFromObj(this.state.myTypes)}
                </div>
            </div>
        );
    }
}

export default PokemonComponent;