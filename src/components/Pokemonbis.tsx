import * as React from "react";

export interface PokemonProps { pokemon: any }
export interface PokemonState { myTypes: any }

class Pokemonbis extends React.Component<PokemonProps, PokemonState> {
    constructor(props: any) {
        super(props);
        this.state = { 
            myTypes : ''
        };
        console.log("CONSTRUCTEUR");
        this.setTypes = this.setTypes.bind(this);
        this.setStats = this.setStats.bind(this);
    }

    setTypes(newPokemon: any, myTypes: Array<any>) {
         fetch(newPokemon.url)
            .then((response) => {
                return response.json();
            }).then((json) => {
                const objPok = json.types;
                for (let key in objPok) {
                    if (!objPok.hasOwnProperty(key)) continue;
                    let obj = objPok[key];
                    myTypes.push(<div>{obj.type.name.toString()}</div>);
                }
                this.setState({myTypes : "coucou"});
            }).catch((ex) => console.log('Parsing failed for types', ex));
    }

    render() {
        console.log("POKEMON RENDER");
        //this.setTypes(this.props.pokemon);
        return (
            <div>
                <h1>Name: {this.props.pokemon.name}</h1>

                <div>
                    Types:
                    {
                        this.state.myTypes
                    }
                </div>

                <div>Statistiques:

                </div>

                <div>Comparison: TODO </div>

            </div>
        );
    }



    setStats(newPokemon: any, myStats: any) {
        fetch(newPokemon.url)
            .then((response) => {
                return response.json();
            }).then((json) => {
                const objStats = newPokemon.stats;
                for (let key in objStats) {
                    if (!objStats.hasOwnProperty(key)) continue;
                    let obj = objStats[key];
                    myStats.push({
                        "name": obj.stat.name,
                        "value": obj.base_stat
                    });
                }
                //this.setState({ myStats });
            }).catch((ex) => console.log('Parsing failed for stats', ex));
    }
}

export default Pokemonbis;