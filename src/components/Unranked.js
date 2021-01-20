import React from 'react'

export default function Unranked() {
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
              <p className="card-text font-weight-bold">Unranked</p>
            </div>
          </div>
        </div>
      </div>
  )
}
