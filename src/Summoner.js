import React from 'react';
import './default_summoner_icon.png'

const Summoner = ({ summonerName, summonerLevel, summonerId, summonerIcon }) => {

    return (
        <div className="row-4 border">
            <ul>
                <li>Level: <b>{summonerLevel}</b></li>
                <li>Account ID: <b>{summonerId}</b></li>
            </ul>
        </div>
    );

}

export default Summoner; 