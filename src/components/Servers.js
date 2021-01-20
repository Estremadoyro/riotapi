import React from "react";
import Header from "./Header";
//import Summoner from "./Summoner";
import SearchBar from "./SearchBar";

export default function Servers() {
  return (
    <div className="container d-flex justify-content-center">
      <div className="col">
        <Header />
        <div className="row row-12">
          <div className="col col-6">
            <button type="button" className="btn btn-outline-primary btn-lg-6 btn-block">
              LAS
            </button>
          </div>
          <div className="col col-6">
            <button type="button" className="btn btn-outline-secondary btn-lg-6 btn-block" disabled={true}>
              LAN
            </button>
          </div>
        </div>
        <p></p>
        <div className="row row-12">
          <div className="col col-6">
            <button type="button" className="btn btn-outline-secondary btn-lg-6 btn-block" disabled={true}>
              NA
            </button>
          </div>
          <div className="col col-6">
            <button type="button" className="btn btn-outline-secondary btn-lg-6 btn-block" disabled={true}>
              BR
            </button>
          </div>
        </div>
        <div className="row my-4">
          <SearchBar />
        </div>

        
      </div>
    </div>
  );
}
