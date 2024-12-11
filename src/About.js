import React from "react";
import "./About.scss";
import DashboardNavBar from "./NavBar/DashboardNavBar";
import Footer from "./Footer";
import { Instagram } from "lucide-react";

const About = () => {
  return (
    <>
      <DashboardNavBar />
      <div className="About">
        <h1 className="aboutHeading">About Us</h1>
        <p>
          Welcome to HERITEDGE, your guide to the Nashik Kumbh Mela and beyond.
          Experience the grand festival by the Godavari River, and explore
          Nashik's iconic landmarks and natural beauty. With HERITEDGE, easily
          plan your trip based on your interests spirituality, adventure, or
          relaxation. Get real-time updates on events, attractions, and more
          with our smart guides and maps. Discover must-visit spots like
          Panchavati, Trimbakeshwar Temple, Goda Park,Anjneri Hills and many
          more. Plus, enjoy virtual tours with our AR and VR features, letting
          you explore Nashik's treasures from anywhere.
        </p>
        <h3 className="h3head">Get Involved :</h3>
        <p>
          Be part of this transformative journey by joining us as a volunteer or
          sharing your feedback to help us grow. Let’s work together to
          celebrate and preserve India’s timeless traditions
        </p>

        <div className="Contact">
          <h4>Contact Us :</h4>
          <p>
            📧 Email: [heritedge@gmail.com] <br />
            📞 Phone: [ ] <br />
            <span>
              Follow Us: Stay updated on our progress and features by following
              us on social media: <Instagram className="icon"/>
            </span>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
