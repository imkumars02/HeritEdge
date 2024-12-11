import React from "react";
import "./HomePage.scss";
import DashboardNavBar from "../NavBar/DashboardNavBar";
import kumbh from "../Images/kumbh.jpg";
import img2 from "../Images/slider2.jpg";
import anjneri from "../Images/anjaneri.jpg";
import harihar from "../Images/harihar.jpg";
import img1 from "../Images/slider5.jpg";
import kalaram from "../Images/KalaramMandir.jpg";
import vani from "../Images/slider7.jpg";
import img4 from "../Images/slider8.jpg";
import { Link } from "react-router-dom";
import misalPav from "../Images/MisalPav.jpg";
import grape from "../Images/grape.jpg";
import Footer from "../Footer";
import Robot from "../Robot";

const HomePage = () => {
  return (
    <>
      <DashboardNavBar />
      <div className="HomePageContainer">
        <div className="textMsg">
          <h4>Uncover the treasures of Nashik</h4>
          <p>A place where every corner tells a story</p>
        </div>
        <div className="ImageSlide">
          <div className="SliderContainer">
            <div className="ImageContent">
              <img src={kumbh} alt="Kumbh" />
            </div>
            <div className="ImageContent">
              <img src={img2} alt="Slider 2" />
            </div>
            <div className="ImageContent">
              <img src={anjneri} alt="Anjneri" />
            </div>
            <div className="ImageContent">
              <img src={harihar} alt="Harihar" />
            </div>
            <div className="ImageContent">
              <img src={img1} alt="Slider 5" />
            </div>
            <div className="ImageContent">
              <img src={kalaram} alt="Kalaram Mandir" />
            </div>
            <div className="ImageContent">
              <img src={vani} alt="Vani" />
            </div>
            <div className="ImageContent">
              <img src={img4} alt="Slider 8" />
            </div>
          </div>
        </div>

        <div className="PlanTrip">
          <div className="TripContainer">
            <div className="PlanText">
              <h3>Don’t just travel, explore Nashik!</h3>
              <p>A city that promises memories you'll cherish forever.</p>
            </div>
            <div className="PlanBtn">
              <Link to={""}>Plan Your Trip</Link>
            </div>
          </div>
        </div>
        <div className="DescriptionContent">
          <div className="Text">
            <p>
              Nashik is not just a destination; it’s an experience of a
              lifetime.
            </p>
          </div>
          <div className="Content">
            <div className="ContentImg">
              <img src={misalPav} alt="Food" />
            </div>
            <div className="ContentText">
              <h3>Misal Spots</h3>
              <p>Find the best Misal Spots and enjoy it to the fullest.</p>
              <h3>Food Points</h3>
              <p>Find the best local food and enjoy it to the fullest.</p>
              <h3>Nearby Places</h3>
              <p>Find the best local food and enjoy it to the fullest.</p>
            </div>
          </div>
          <div className="Content">
            <div className="ContentText1">
              <h3>Temples</h3>
              <p>Get the spiritual experience and feel grateful.</p>
              <h3>Trekking Points</h3>
              <p>Discover breathtaking trekking points for adventure enthusiasts</p>
              <h3>Historical Places</h3>
              <p>Explore historical places with rich cultural heritage</p>
            </div>
            <div className="ContentImg1">
              <img src={grape} alt="Food" />
            </div>
          </div>
        </div>
      </div>
      <Robot/>
      <Footer/>
    </>
  );
};

export default HomePage;
