import * as React from "react";

export function extractObjectFromObj(objToDecompose: object, myObj: Array<object>) {
    for (let key in objToDecompose) {
        if (!objToDecompose.hasOwnProperty(key)) continue;
        let objType = objToDecompose[key];
        myObj.push(objType);
    }
    return myObj;
}

export function extractTypesFromObj(objToDecompose: any) {
    return <div className="Pokemon-types">
        {objToDecompose.map((obj: any) => 
            <p key={obj.type.name}>{obj.type.name}</p>)}
    </div>;
}

export function extractStatsFromObj(objToDecompose: any) {
    return (<div>
        <ul className="Pokemon-statistics-names"> 
            {objToDecompose.map((obj: any) =>
                <li key={obj.stat.name}>{obj.stat.name}</li>)}
        </ul>
        <ul className="Pokemon-statistics-stats"> 
            <p>stats</p> 
            {objToDecompose.map((obj: any) =>
                <li key={obj.stat.name+": "+obj.base_stat}>{obj.base_stat}
                 <span>Statistics of the pokemon</span></li>
            )}
        </ul>
    </div>)
}

export function extractStatsComparisonFromTab(tabToDecompose: any) {
    return (<div> {tabToDecompose.map((element: any, index:number) =>
        <ul className="Pokemon-statistics-stats" 
            key={"type"+index}> 
            <p>{element[0]}</p>
            {element[2].map((stat: any, index2:number) => {
                return <li key={index+": "+index2}> 
                    { Math.round( stat[1] / element[1] )} 
                    <span>Average statistics of {element[0]} type</span></li>
            })}     
        </ul>)}
    </div>)
}
    




