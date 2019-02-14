import * as React from "react";
import { extractStatsFromObj, extractStatsComparisonFromTab } from '../services/ExtractorService';

export interface StatisticsProps { myTypes: any; myStats: any }
export interface StatisticsState {
    myStats: Array<any>;
    statsTotal: any;
    numberPokemonByType: any;
}

class Statistics extends React.Component<StatisticsProps, StatisticsState> {
    constructor(props: any) {
        super(props);
        this.state = {
            myStats: [],
            statsTotal: [],
            numberPokemonByType: new Map()
        };
        this.resetState = this.resetState.bind(this);
        this.setNewState = this.setNewState.bind(this);
        this.initializeStatsTotal = this.initializeStatsTotal.bind(this);
        this.fetchAllPokemonAndUpdateStats = this.fetchAllPokemonAndUpdateStats.bind(this);
        this.getNewStatsTotal = this.getNewStatsTotal.bind(this);
        this.updateStats = this.updateStats.bind(this);
    }

    componentDidUpdate(prevProps: any): void {
        const newTypes = this.props.myTypes;
        const newStats = this.props.myStats;
        if ((newTypes !== prevProps.myTypes) && (newStats !== prevProps.myStats)) {
            this.resetState();
            newTypes.map((objType: any) => {
                fetch(objType.type.url)
                    .then((response) => {
                        return response.json();
                    }).then((typeObj) => {
                        this.setNewState(newStats, typeObj.name, typeObj.pokemon.length);
                        this.fetchAllPokemonAndUpdateStats(typeObj.name, typeObj.pokemon);
                    }).catch((ex) => console.log('Parsing failed for types', ex))
            })
        }
    }

    resetState(): void {
        this.setState({ myStats: [], statsTotal: [], numberPokemonByType: [] });
    }

    setNewState(newStats: any, typeName: string, nbOfPokemon: number): void {
        this.setState({
            myStats: newStats,
            statsTotal: this.initializeStatsTotal(typeName, nbOfPokemon, newStats)
        });
    }

    initializeStatsTotal(type: string, nbOfPokemon: number, statsOfThePokemon: any): any {
        let newStatsTotal = this.state.statsTotal;
        newStatsTotal.push([
            type,
            nbOfPokemon,
            statsOfThePokemon.map((statObj: any) =>
                [statObj.stat.name, 0])
        ]);
        return newStatsTotal;
    }

    fetchAllPokemonAndUpdateStats(typeToModify: string, allPokemon: any): any {
        allPokemon.map((aPokemonObj: any) => {
            fetch(aPokemonObj.pokemon.url)
                .then((response) => {
                    return response.json();
                }).then((aPokemon) => {
                    this.setState({
                        statsTotal: this.getNewStatsTotal(typeToModify, aPokemon)
                    })
                }).catch((ex) => console.log('Parsing failed for types', ex))
        });
    }

    getNewStatsTotal(typeToModify: string, aPokemon: any): any {
        return (this.state.statsTotal).map((typeInfos: any) => {
            if (typeInfos[0] == typeToModify) {
                return this.updateStats(aPokemon, typeInfos);
            } else { return typeInfos }
        });
    }

    updateStats(aPokemon: any, itsStats: any): Array<any> {
        return [
            itsStats[0],
            itsStats[1],
            itsStats[2].map((statToUpdate: any) => {
                let scoreUpdated = statToUpdate[1] +
                    (aPokemon.stats.find((aStatObj: any) =>
                        (aStatObj.stat.name == statToUpdate[0])).base_stat);
                return [statToUpdate[0], scoreUpdated]
            })
        ]
    }

    render() {
        return (
            <div className="Pokemon-statistics">
                {extractStatsFromObj(this.state.myStats)}
                {extractStatsComparisonFromTab(this.state.statsTotal)}
            </div>
        );
    }
}

export default Statistics;
