import React, { useContext } from "react";
//import config from "../config";
import Summoner from "./Summoner";
import NotFound from "./NotFound";
import { SummonerContext } from "../contexts/SummonerContext";

import "../styles.css";
import Loader from "./Loader";

export default function SearchBar() {
  const {
    showInfo,
    search,
    setSearch,
    setLoading,
    result,
    status,
    exists,
    loading,
    keyStatus,
  } = useContext(SummonerContext);

  const getSummonerInfo = async (e) => {
    e.preventDefault();
    const showResult = await showInfo();
    //setResult(true);
    setLoading(false);
    //console.log(`Result: ${result}`);
    return showResult;
  };

  const updateSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="col">
      <div className="row">
        <div className="col">
          <form className="form-group" onSubmit={getSummonerInfo}>
            {status && exists ? (
              <div className="alert alert-danger" role="alert">
                {status}
              </div>
            ) : null}
            {keyStatus && <div className="alert alert-warning" role="alert">
                {keyStatus}
              </div>}
            <input
              type="text"
              placeholder="Mojotax, Rodnaldinho, Runewolf, ..."
              value={search}
              onChange={updateSearch}
              className="form-control"
            />
            <p></p>
            <button
              className="btn btn-primary btn-block"
              disabled={loading}
              type="submit"
            >
              Look Up!
            </button>
          </form>
        </div>
      </div>
      {loading && <Loader />}
      {result && !loading ? <Summoner /> : null}

      {!exists && !loading ? <NotFound />: null}
    </div>
  );
}
