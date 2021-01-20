import React from "react";

export default function SearchBar() {
  const config = require("./config");

  const [summoner, setSummoner] = useState([]);
  const [match, setMatches] = useState([]);
  const [icon, setIcon] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setrecordsPerPage] = useState(10);

  const [champion, setChampion] = useState([]);

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  //Get summoner info
  const getSummoner = async (summoner) => {
    const response = await fetch(
      `${config.summoner_url}/${config.summoner}/${config.region}/${summoner}`,
      { mode: "cors" }
    );
    const data = await response.json();
    console.log(`${config.summoner_url}/${config.summoner}/${config.region}/${query}`);
    console.log(response);
    setSummoner(data);

    await getSummonerMatches(data.accountId);
    getSummonerIcon(data.profileIconId);
  };

  //Get summoner matches info
  const getSummonerMatches = async (accountId) => {
    console.log(accountId);
    const response = await fetch(
      `${config.summoner_matches_url}/${config.match}/${config.region}/${accountId}`,
      { mode: "cors" }
    );
    const data = await response.json();
    console.log(
      `${config.summoner_matches_url}/${config.match}/${config.region}/${accountId}`
    );

    setMatches(data.matches);
    getChampionByKey(data.matches[0].champion, "en_US");
  };

  //Get summoner icon image
  const getSummonerIcon = async (iconId) => {
    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/10.2.1/data/en_US/profileicon.json`,
      { mode: "cors" }
    );
    const data = await response.json();
    console.log(`Icon id --> ${data.data[iconId].image.full}`);
    setIcon(data.data[iconId].image.full);
    console.log(icon);
    IconLoad();
  };

  const indexOfLastPost = currentPage * recordsPerPage;
  const indexOfFirstPost = indexOfLastPost - recordsPerPage;
  const currentRecords = match.slice(indexOfFirstPost, indexOfLastPost);

  let championByIdCache = {};
  let championJson = {};

  async function getLatestChampionDDragon(language) {
    if (championJson[language]) return championJson[language];

    const response = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/10.1.1/data/${language}/champion.json`
    );

    championJson[language] = await response.json();

    return championJson[language];
  }

  async function getChampionByKey(key, language) {
    // Setup cache
    if (!championByIdCache[language]) {
      let json = await getLatestChampionDDragon(language);

      championByIdCache[language] = {};
      for (var championName in json.data) {
        if (!json.data.hasOwnProperty(championName)) continue;

        const champInfo = json.data[championName];
        championByIdCache[language][champInfo.key] = champInfo;
      }
    }

    //setChampionName(championByIdCache[language][key])
    console.log(championByIdCache[language][key].id);
    console.log();
    console.log(championByIdCache[language][key]);

    return championByIdCache[language][key];
  }

  const getSearch = (e) => {
    e.preventDefault();

    //Query value updates
    setQuery(search);
    console.log(`Name to be sent --> ${search}`);
    getSummoner(search);
    Result();
  };

  function IconLoad() {
    if (icon !== "") {
      return (
        <img
          src={`http://ddragon.leagueoflegends.com/cdn/10.2.1/img/profileicon/` + icon}
          alt=""
          className="summonerIcon rounded-circle my-3"
        />
      );
    } else {
      return "";
    }
  }

  function Result() {
    if (query !== "") {
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
            summonerIcon={summoner.profileIconId}
          />
          Games
          <SummonerMatches games={currentRecords} />
          <Pagination
            recordsPerPage={recordsPerPage}
            totalRecords={match.length}
            paginate={paginate}
          />
        </div>
      );
    } else {
      return "";
    }
  }

}