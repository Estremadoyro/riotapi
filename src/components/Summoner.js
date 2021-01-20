import React, { useContext, useEffect, useState } from "react";
import { SummonerContext } from "../contexts/SummonerContext";

export const Summoner = () => {
  const { summonerInfo, rankedSoloQInfo, rankedFlexQInfo } = useContext(SummonerContext);
  const [finished, setfinished] = useState(false);

  const parseRank = () => {
    setfinished(false);
    //console.log(`Rank ${rankedSoloQInfo.rank}`);
    switch (rankedSoloQInfo.rank) {
      case "I":
        rankedSoloQInfo.rank = 1;
        break;
      case "II":
        rankedSoloQInfo.rank = 2;
        break;
      case "III":
        rankedSoloQInfo.rank = 3;
        break;
      case "IV":
        rankedSoloQInfo.rank = 4;
        break;
      default:
        break;
    }

    switch (rankedFlexQInfo.rank) {
      case "I":
        rankedFlexQInfo.rank = 1;
        break;
      case "II":
        rankedFlexQInfo.rank = 2;
        break;
      case "III":
        rankedFlexQInfo.rank = 3;
        break;
      case "IV":
        rankedFlexQInfo.rank = 4;
        break;
      default:
        break;
    }
    setfinished(true);
  };

  useEffect(() => {
    parseRank();
  });

  if (finished) {
    return (
      <div className="card mx-auto" style={{ maxWidth: 720, background: "transparent" }}>
        <div className="row no-gutters align-items-center">
          <div className="col-md-4 text-center">
            <div className="card-title text-center py-0 my-0">
              <h2>{summonerInfo.name} </h2>
            </div>

            <div className="text-center">
              <img
                src={`http://ddragon.leagueoflegends.com/cdn/11.1.1/img/profileicon/${summonerInfo.profileIconId}.png`}
                className="summonerIcon card-img thumbnail"
                alt=""
              />
            </div>
          </div>
          <div className="col-md-8">
            <div className="card-body p-0 text-center">
              <h4 className="badge badge-pill badge-primary">
                Level: {summonerInfo.summonerLevel}
              </h4>
              {rankedSoloQInfo.hotStreak || rankedFlexQInfo.hotStreak ? (
                <h4 className="badge badge-pill badge-danger">
                  Streak: <i className="fab fa-hotjar" />
                </h4>
              ) : (
                <h4 className="badge badge-pill badge-secondary">
                  Streak: <i className="fab fa-hotjar" />
                </h4>
              )}
              <table className="table m-0">
                <thead className="text-center">
                  <tr>
                    {rankedSoloQInfo.hotStreak ? (
                      <th scope="col" className="p-0">
                        Solo
                        <i className="fab fa-hotjar text-danger mx-2" />
                      </th>
                    ) : (
                      <th scope="col" className="p-0">
                        Solo
                      </th>
                    )}
                    {rankedFlexQInfo.hotStreak ? (
                      <th scope="col" className="p-0">
                        Flex
                        <i className="fab fa-hotjar text-danger mx-2" />
                      </th>
                    ) : (
                      <th scope="col" className="p-0">
                        Flex
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="p-0">
                      {rankedSoloQInfo !== "Unranked" ? (
                        <img
                          src={`https://cdn.mobalytics.gg/assets/lol/images/rank-icon/helm/${rankedSoloQInfo.tier.toLowerCase()}_${
                            rankedSoloQInfo.rank
                          }.png`}
                          alt=""
                          className="rank_emblem"
                        />
                      ) : (
                        <img
                          src="https://opgg-static.akamaized.net/images/medals/default.png"
                          className="rank_emblem"
                          alt=""
                        />
                      )}
                    </td>
                    <td className="p-0">
                      {rankedFlexQInfo !== "Unranked" ? (
                        <img
                          src={`https://cdn.mobalytics.gg/assets/lol/images/rank-icon/helm/${rankedFlexQInfo.tier.toLowerCase()}_${
                            rankedFlexQInfo.rank
                          }.png`}
                          alt=""
                          className="rank_emblem"
                        />
                      ) : (
                        <img
                          src="https://opgg-static.akamaized.net/images/medals/default.png"
                          className="rank_emblem"
                          alt=""
                        />
                      )}
                    </td>
                  </tr>
                  <tr className="text-center">
                    {rankedSoloQInfo !== "Unranked" ? (
                      <td className="font-weight-bold text-primary p-0">
                        {rankedSoloQInfo.tier} {rankedSoloQInfo.rank}
                      </td>
                    ) : (
                      <td className="font-weight-bold text-secondary p-0">UNRANKED</td>
                    )}

                    {rankedFlexQInfo !== "Unranked" ? (
                      <td className="font-weight-bold text-primary p-0">
                        {rankedFlexQInfo.tier} {rankedFlexQInfo.rank}
                      </td>
                    ) : (
                      <td className="font-weight-bold text-secondary p-0">UNRANKED</td>
                    )}
                  </tr>
                  <tr className="text-center">
                    <td className="font-weight-bold p-0">
                    <h4 className="badge badge-pill badge-warning">
                        LP {rankedSoloQInfo.leaguePoints}
                      </h4>
                      <h4 className="badge badge-pill badge-success">
                        W {rankedSoloQInfo.wins}
                      </h4>
                      <h4 className="badge badge-pill badge-danger">
                        L {rankedSoloQInfo.losses}
                      </h4>
                    </td>
                    <td className="font-weight-bold p-0">
                    <h4 className="badge badge-pill badge-warning">
                        LP {rankedFlexQInfo.leaguePoints}
                      </h4>
                      <h4 className="badge badge-pill badge-success">
                        W {rankedFlexQInfo.wins}
                      </h4>
                      <h4 className="badge badge-pill badge-danger">
                        L {rankedFlexQInfo.losses}
                      </h4>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Summoner;
