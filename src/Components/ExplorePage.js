import React from "react";
import "./ExplorePage.scss";
import DashboardNavBar from "../NavBar/DashboardNavBar";
// import Nashik from "../Images/nashik.jpg";
// import Kumbh from "../Images/kumbh.jpg";
import { Link } from "react-router-dom";
import KumbhImage from "../Images/starting.jpg";
import { BiRightArrow } from "react-icons/bi";


const ExplorePage = () => {
  return (
    <>
      <DashboardNavBar />
      <div className="ExploreContainer">
        <div className="LandingImage">
          <img src={KumbhImage} alt="Kumbh" />
          <div className="LandingText">
            <h1>कुम्भ २०२७</h1>
            <p>यह पर्व नहीं, एक यात्रा है</p>
          </div>
          <div className="StartBtn">
            <Link to={"/Login"}>Explore HeritEdge <BiRightArrow className="icons"/></Link>
          </div>
        </div>
        {/* <div className="ExplorePage">
          <div className="ExploreContent">
            <div className="ExploreNsk">
              <div className="ImageContainer">
                <img src={Nashik} alt="Nashik" />
              </div>
              <div className="BtnContainer">
                <Link to={"/HomePage"}>Explore Nashik</Link>
              </div>
            </div>
            <p></p>
            <div className="ExploreNsk">
              <div className="ImageContainer">
                <img src={Kumbh} alt="Kumbh" />
              </div>
              <div className="BtnContainer">
                <Link to={"/"}>Explore Kumbh !</Link>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default ExplorePage;
