export function getPokemonMatchingList(beginningOfPokemon: string, allPokemon: any): any {
    const pokemonList = allPokemon
        .filter((aPokemon: any) => {
            const myRegex = new RegExp('^' + beginningOfPokemon, "i");
            return myRegex.test(aPokemon.name);
        });
    return pokemonList;
}

export function getPokemonByName(pokemonName: string, listOfPokemon: any){
    const pokemonFound = listOfPokemon.find( (aPokemon:any) => {
        return aPokemon.name == pokemonName;
    })
    return pokemonFound;
}

