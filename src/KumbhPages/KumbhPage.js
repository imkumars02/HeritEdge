import React, { useState } from "react";
import "./KumbhPage.scss";
import KumbhNavBar from "./KumbhNavBar";
import Footer from "../Footer";
import video from "../Images/v1.mp4";
import BatchingDate from "./BatchingDate";
import PlanPri from "./PlanPri";
import MajesticPage from "./MajesticPage";
import ARVRPage from "../Components/ARVRPage";
import Gallery from "./Gallery";

const KumbhPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
    const video = document.getElementById("heroVideo");
    video.play();
  };
  return (
    <div>
      <KumbhNavBar />
      <div className="hero-section">
        <video
          id="heroVideo"
          className={`hero-video ${isPlaying ? "visible" : ""}`}
          loop
          muted
        >
          <source src={video} type="video/mp4" />
        </video>

        <div className={`content-overlay ${isPlaying ? "hidden" : ""}`}>
          <h1>कुम्भ २०२७</h1>
          <p>Welcome to the 2027 Maha Kumbh Mela,</p>
          <p>world's largest congregation of people!</p>
          <p>
            Join us in this grand spiritual gathering to experience the vibrant
            culture, devotion, and unity.
          </p>

          <div className="countdown">
            <div className="days">
              <span>951 days to go</span>
            </div>
            <div className="dates">
              <span>13 January - 26 February</span>
            </div>
          </div>
        </div>

        <button
          className={`play-button ${isPlaying ? "hidden" : ""}`}
          onClick={handlePlay}
          aria-label="Play video"
        >
          <svg
            viewBox="0 0 24 24"
            width="34"
            height="34"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          >
            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
          </svg>
        </button>
      </div>
      <PlanPri />
      <BatchingDate />
      <MajesticPage />
      {/* <Gallery /> */}
      <ARVRPage />
      <Footer />
    </div>
  );
};

export default KumbhPage;
