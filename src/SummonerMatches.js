import React from 'react';

const SummonerMatches = ({gameId, gameChampion, gameQueue}) => { 

    return(
        
        <ul>
            <li>Game Id: {gameId}</li>
            <li>Game Champion: {gameChampion}</li>
            <li>Game Queue: {gameQueue}</li>
        </ul>
    );

}

export default SummonerMatches ; 