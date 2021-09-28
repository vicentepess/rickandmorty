import "./style.css";
import axios from "axios";
import { useEffect, useState } from "react";

const ChardCard = ({ elem }) => {
  const [episodeName, setEpisodeName] = useState('');
  
  useEffect(() => {
    axios({
      method: "get",
      url: elem.episode[0],
    }).then((res) => setEpisodeName(res.data.name));
  },[elem])

  return (
    <div className="containerCard">
      <img className="image" src={elem.image} alt="" />
      <div className="description">
        <h1>{elem.name}</h1>
        <p className="description_status_specie">
          <span className={`circle ${elem.status}`}></span> {elem.status} -{" "}
          {elem.species}
        </p>
        <div className="description_location">
          <h2>Last known location:</h2>
          <a href={elem.location.url}>{elem.location.name}</a>
        </div>
        <div className="description_firstSeen">
          <h2>First seen in:</h2>
          <a href={elem.episode[0]}>{episodeName}</a>
        </div>
      </div>
    </div>
  );
};

export default ChardCard;
