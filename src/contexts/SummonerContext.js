import React, {useState} from 'react'; 
import config from '../config'; 

export const SummonerContext = React.createContext(); 

export const SummonerContextProvider = props => {

  const [summonerInfo, setSummonerInfo] = useState([]);
  //const [rankedInfo, setRankedInfo] = useState([]);
  const [rankedSoloQInfo, setRankedSoloQInfo] = useState([]);
  const [rankedFlexQInfo, setRankedFlexQInfo] = useState([]);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [exists, setExists] = useState(true);
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");

  const fetchSummonerInfo = async () => {
    try {
      setStatus("");
      setLoading(true);
      const getSummoner = await fetch(
        `${config.summoner_url}/${config.summoner}/${config.region}/${search}`,
        { mode: "cors" }
      );
      if (getSummoner.status === 404) {
        setStatus("User doesn't exist :(");
        setLoading(false);
        setResult(false);
        setExists(false); 
        return;
      }
      const getSummonerJson = await getSummoner.json();
      setSummonerInfo(getSummonerJson);
      setResult(false);
      setExists(true); 
      return getSummonerJson;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRankedInfo = async (summonerId) => {
    try {
      const getRanked = await fetch(
        `${config.summoner_rank}/${config.summoner}/${config.region}/${summonerId}`,
        { mode: "cors" }
      );
      const getRankedJson = await getRanked.json();
      //console.log(`Length: ${getRankedJson.length}`)
      if (getRankedJson.length === 1) {
        if(getRankedJson[0].queueType === "RANKED_SOLO_5x5"){
          setRankedSoloQInfo(getRankedJson[0]);
          setRankedFlexQInfo("Unranked");
        } else {
          setRankedSoloQInfo("Unranked");
          setRankedFlexQInfo(getRankedJson[0]);
        }
        
      } else if (getRankedJson.length === 0) {
        setRankedFlexQInfo("Unranked");
        setRankedSoloQInfo("Unranked");
      } else { 
        if (getRankedJson[0].queueType === "RANKED_SOLO_5x5"){
          setRankedSoloQInfo(getRankedJson[0]);
          setRankedFlexQInfo(getRankedJson[1]);
        } else if (getRankedJson[0].queueType === "RANKED_FLEX_SR"){
          setRankedFlexQInfo(getRankedJson[0]);
          setRankedSoloQInfo(getRankedJson[1]);
        }
        
        
      }
      setResult(true); 
      // console.log(`Ranked`); 
      // console.log(getRankedJson); 
      return getRankedJson;
    } catch (error) {
      console.log(error);
    }
  };

  const showInfo = async () => { 
    try {
      if (search !== "") {
        const showSummoner = await fetchSummonerInfo(); 
        if (showSummoner !== undefined ){
          await fetchRankedInfo(showSummoner.id); 
          return showSummoner; 
        }
        
      }
      setStatus("Please, provide a summoner name owo");
      setResult(false); 

    } catch (error) {
      console.log(error); 
    }
  }

  const values = {
    summonerInfo,
    rankedSoloQInfo,
    rankedFlexQInfo,
    result,
    status,
    exists,
    loading,
    search,
    setSearch,
    setResult,
    setLoading,
    showInfo
  }

  return (
    <SummonerContext.Provider value={values}>
      {props.children}
    </SummonerContext.Provider>
  )
}
