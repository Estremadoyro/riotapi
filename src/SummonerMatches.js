import React from 'react';

const SummonerMatches = ({ games }) => {

    return (

        <div className="matchesContainer">

            {games.map(match => (
                <ul className="py-2" key={match.gameId}>
                    <li>Game Id: {match.gameId}</li>
                    <li>Game Champion: {match.champion}</li>
                    <li>Game Queue: {match.queue}</li>
                </ul>
            ))}
        </div>
    );

}

export default SummonerMatches; 