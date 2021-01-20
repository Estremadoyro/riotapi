import React, { useState, useEffect } from "react";
import DefaultSummoner from "../static/default_summoner_icon.png";
import config from "../config";
//import Unranked from "./Unranked"; 

export default function Summoner(props) {
  //const [summoner, setSummonerRank] = useState({summonerRankInfo: []});
  const [summonerRank, setsummonerRank] = useState([]);
  const [result, setResult] = useState(false);
  const [unranked, setUnranked] = useState(false);

  const getSummonerRank = async () => {
    try {
      setResult(false);
      const response = await fetch(
        `${config.summoner_rank}/${config.summoner}/${config.region}/${props.id}`,
        { mode: "cors" }
      );
      const jsonResponse = await response.json();
      if (jsonResponse.length() < 1) {
        setUnranked(true); 
      }
      setsummonerRank(jsonResponse);
      console.log(jsonResponse);
      setResult(true);
      return jsonResponse;
    } catch (err) {
      console.log(err);
    }
  };

  const showSummonerRank = async () => {
    const show = await getSummonerRank();
    //console.log(`SummonerRank: ${summonerRank}`);
    props.setLoading(false);
    console.log(`Result: ${result}`);
    return show;
  };

  useEffect(() => {
    showSummonerRank();
  }, [props.id]);

  if (result) {
    console.log(`Result value ${result}`);
    return (
      <div className="card mx-auto" style={{ maxWidth: 540 }}>
        <div className="row no-gutters">
          <div className="col-md-4">
            <img
              src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${props.icon}.png`}
              className="card-img"
              alt={DefaultSummoner}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{props.name}</h2>
              <p className="card-text">Level: {props.level}</p>
              {result && <p className="card-text">Wins: {summonerRank[0].wins}</p>}
              <p className="card-text">Losses: {summonerRank.losses}</p>
              <p className="card-text">
                <small className="text-muted">Last updated 3 mins ago</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  } else return null;
}
