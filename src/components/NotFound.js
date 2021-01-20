import React from "react";
import bee_404 from "../static/404.png"; 

export default function NotFound() {
  
  return (
    <div className="card mx-auto" style={{maxWidth: 540}}>
      <div className="row no-gutters">
        <div className="col-md-4">
          <img src={bee_404} className="card-img" alt="..." />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h2 className="card-title">404...</h2>
            <p className="card-text">
              Summoner doesn't exist :( 
            </p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
