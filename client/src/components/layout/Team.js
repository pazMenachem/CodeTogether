import React from "react";
import PazImage from "../../static/Paz.png"
import YaelImage from "../../static/Yael.png"
import "../css/Team.css";


const Team = () => {
  return (
    <div id="team" className="text-center">
      <div className="container">
        <div className="col-md-offset-2 section-title">
          <h2>Meet the Team</h2>
        </div>

        <div className="thumbnails">
            <div className="col-md-3 col-sm-6 team">
                <div className="thumbnail">
                {" "}
                <img src={PazImage} alt="..." className="img" />
                    <div className="caption">
                        <h4>{"Paz"}</h4>
                        <p>{"Awesome Student"}</p>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6 team">
                <div className="thumbnail">
                    {" "}
                    <img src={YaelImage} alt="..." className="img" />
                    <div className="caption">
                        <h4>{"Yael"}</h4>
                        <p>{"Ok Student"}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Team;