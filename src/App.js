import React, { useEffect, useState } from 'react';
import Summoner from './Summoner';
import SummonerMatches from './SummonerMatches';
import Pagination from './Pagination';

import $ from 'jquery';

import './style.css'
//import './bootstrap.css'

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const App = () => {

  const config = require('./config');

  const [summoner, setSummoner] = useState([]);
  const [match, setMatches] = useState([]);
  const [icon, setIcon] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setrecordsPerPage] = useState(10);

  const [champion, setChampion] = useState([]);

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  /*
  useEffect(() => {

    getSummoner();

  }, [query]);
  */

  //Get summoner info
  const getSummoner = async (summoner) => {

    const response = await fetch(`${config.summoner_url}/${config.summoner}/${config.region}/${summoner}`, { mode: 'cors' })
    const data = await response.json();
    console.log(`${config.summoner_url}/${config.summoner}/${config.region}/${query}`);
    console.log(response);
    setSummoner(data);

    await getSummonerMatches(data.accountId);
    getSummonerIcon(data.profileIconId);

  }

  //Get summoner matches info
  const getSummonerMatches = async (accountId) => {
    console.log(accountId)
    const response = await fetch(`${config.summoner_matches_url}/${config.match}/${config.region}/${accountId}`, { mode: 'cors' })
    const data = await response.json();
    console.log(`${config.summoner_matches_url}/${config.match}/${config.region}/${accountId}`)

    setMatches(data.matches);
    getChampionByKey(data.matches[0].champion, 'en_US');

  }

  //Get summoner icon image
  const getSummonerIcon = async (iconId) => {
    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/10.2.1/data/en_US/profileicon.json`, { mode: 'cors' })
    const data = await response.json();
    console.log(`Icon id --> ${data.data[iconId].image.full}`)
    setIcon(data.data[iconId].image.full)
    console.log(icon)
    IconLoad()
  }

  const indexOfLastPost = currentPage * recordsPerPage;
  const indexOfFirstPost = indexOfLastPost - recordsPerPage;
  const currentRecords = match.slice(indexOfFirstPost, indexOfLastPost)

  let championByIdCache = {};
  let championJson = {};

  async function getLatestChampionDDragon(language) {

    if (championJson[language])
      return championJson[language];

    const response = await fetch(`https://ddragon.leagueoflegends.com/cdn/10.1.1/data/${language}/champion.json`);

    championJson[language] = await response.json();

    return championJson[language];

  }

  async function getChampionByKey(key, language) {

    // Setup cache
    if (!championByIdCache[language]) {
      let json = await getLatestChampionDDragon(language);

      championByIdCache[language] = {};
      for (var championName in json.data) {
        if (!json.data.hasOwnProperty(championName))
          continue;

        const champInfo = json.data[championName];
        championByIdCache[language][champInfo.key] = champInfo;
      }
    }

    //setChampionName(championByIdCache[language][key])
    console.log(championByIdCache[language][key].id)
    console.log()
    console.log(championByIdCache[language][key])


    return championByIdCache[language][key];
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();

    //Query value updates
    setQuery(search);
    console.log(`Name to be sent --> ${search}`)
    getSummoner(search);
    Result()

  }

  function IconLoad() {

    if (icon != '') {

      return (

        <img src={`http://ddragon.leagueoflegends.com/cdn/10.2.1/img/profileicon/` + icon} alt=""
          className="summonerIcon rounded-circle my-3" />
      )
    } else {
      return ""
    }

  }

  function Result() {

    if (query !== '') {

      return (


        <div>

          <div className="row-4 border text-center">

            <IconLoad />

            <div className="summonerName">
              <div className="col">{summoner.name}</div>
            </div>

          </div>
          Summoner Data
          <Summoner
            key={summoner.accountId}
            summonerName={summoner.name}
            summonerLevel={summoner.summonerLevel}
            summonerId={summoner.accountId}
            summonerIcon={summoner.profileIconId} />

          Games
            <SummonerMatches games={currentRecords} />

          <Pagination recordsPerPage={recordsPerPage} totalRecords={match.length} paginate={paginate} />
        </div>
      );
    } else {
      return ""
    }
  }

  function SummonerGames(props) {
    const match = props.hasGames;

    if ($.isEmptyObject({})) {

    }
  }


  const paginate = pageNumber => setCurrentPage(pageNumber)
  return (

    <div className="App">

      <div className="container d-flex justify-content-center">

        <div className="col">

          <div className="row">
            <div className="col text-center">
              <h1 className="title my-4">Summoner Lookup</h1>
            </div>
          </div>

          
          <div className="row text-center mb-4 mt-2">
            <div className="col-3">

              <div className="row-6">
                
                <button type="button" className="btn btn-warning btn-rounded">NA</button>
              </div>
              <div className="row-6">
                <button type="button" className="btn btn-warning btn-rounded">NA</button>
              </div>
              
            </div>
            <div className="col-3">

              <div className="row-6">
                <button type="button" className="btn btn-warning btn-rounded">NA</button>
              </div>
              <div className="row-6">
                <button type="button" className="btn btn-warning btn-rounded">NA</button>
              </div>
              

            </div>
            <div className="col-3">

              <div className="row-6">
                <button type="button" className="btn btn-warning btn-rounded">NA</button>
              </div>
              <div className="row-6">
                <button type="button" className="btn btn-warning btn-rounded">NA</button>
              </div>
              

            </div>
            <div className="col-3">

              <div className="row-6">
                <button type="button" className="btn btn-warning btn-rounded">NA</button>
              </div>
              <div className="row-6">
                <button type="button" className="btn btn-warning btn-rounded">NA</button>
              </div>
              

            </div>

          </div>

          <div className="row bg-dark">

            <div className="col text-center">
              <form className="md-form my-2" onSubmit={getSearch}>

                <input type="text" placeholder="Summoner Name" value={search} onChange={updateSearch} className="input_summoner form-control pb-0 mb-0" />

                <button className="btn btn-info btn-block my-4" type="submit">Look Up!</button>
              </form>
            </div>

          </div>
          <p></p>

          <div className="col bg-dark result p-0">

            <Result />

          </div>
        </div>
      </div>
    </div>
  );

}

export default App;