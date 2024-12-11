import React from "react";
import "./MajesticPage.scss";
import { Brain } from "lucide-react";
import cctv from '../Images/Group1/CCTV.jpg.png'
import Container from '../Images/Group1/Container.png'
import techslide2 from '../Images/Group1/tech-slide2.png.png'
import techslide3 from '../Images/Group1/tech-slide3.png.png'

function MajesticPage() {
  return (
    <div className="majestic-section">
      <div className="content-container">
        <div className="header">
          <Brain className="header-icon" />
          <h1>Majestic Maha Kumbh</h1>
        </div>

        <div className="main-content">
          <div className="image-grid">
            <div className="grid-item">
              <img
                src={cctv}
                alt="CCTV surveillance cameras"
              />
            </div>
            <div className="grid-item">
              <img
                src={Container}
                alt="Surveillance drone"
              />
            </div>
            <div className="grid-item">
              <img
                src={techslide2}
                alt="Security personnel on boats"
              />
            </div>
            <div className="grid-item">
              <img
                src={techslide3}
                alt="Security motorcade"
              />
            </div>
          </div>

          <div className="content-text">
            <h2>Surakshit Maha Kumbh</h2>
            <p>
              Embark on a journey of divine harmony at Maha Kumbh Mela 2025,
              where your safety is our utmost priority. Experience Surakshit
              Maha Kumbh, enabling a secure and protected pilgrimage for every
              pilgrim.
            </p>
            <div className="hashtag">
              #सुरक्षित
              <br />
              महाकुम्भ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MajesticPage;
