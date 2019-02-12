import * as React from "react";
import { extractObjectFromObj, extractTypesFromObj } from '../services/ExtractorService';
import Statistics from './Statistics';

export interface PokemonProps { pokemon: any }
export interface PokemonState { 
    id: number;
    myPicture: string;
    myTypes: Array<object>; 
    myStats: Array<object>; 
}

class Pokemon extends React.Component<PokemonProps, PokemonState> {
    constructor(props: any) {
        super(props);
        this.state = {
            id: 0,
            myPicture: '',
            myTypes: [],
            myStats: []
        };
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() { this.fetchData(this.props.pokemon.url); }
    componentDidUpdate(prevProps: any) {
        const newProps = this.props.pokemon;
        if (newProps !== prevProps.pokemon) {
            this.fetchData(newProps.url);
        }
    }

    fetchData(url: any) {
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

export default Pokemon;