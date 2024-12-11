import React from "react";
import "./NearFoodPlace.scss";
import DashboardNavBar from "../NavBar/DashboardNavBar";
import Footer from "../Footer";
import Robot from "../Robot";
import thali from "../Images/Food_illustration.jpg";
import sayantaraImg from "../Images/sayantara.jpg";
import budhaHalwaiImg from "../Images/budha-halwai.jpg";
import shoukinBhelImg from "../Images/shaukin-bhel.jpg";
import nadanThaliImg from "../Images/sadhana.jpg";
import shagunThaliImg from "../Images/shagun.jpg";
import samarthJuiceImg from "../Images/samarth.jpg";

const NearFoodPlace = () => {
  return (
    <div className="page-container">
      <DashboardNavBar />
      <div className="near-food-place">
        <div className="title">
          <img src={thali} alt="Thali" />
          <h2>Nearby Food Places</h2>
        </div>
        <div className="food-container">
          {/* Sayantara Food Card */}
          <div className="food-card">
            <div className="card-content">
              <div className="text-content">
                <h3>Sayantara</h3>
                <p>
                  <span className="location-icon">📍</span>
                  Shop No.5, Deshpande Building, Shop No.113, Bhadrakali Fruit
                  Market, 1419, Bhadrakali Rd, Bhadrakali, Koknipura, Nashik
                </p>
              </div>
              <div className="image-content">
                <img src={sayantaraImg} alt="Sayantara" />
              </div>
            </div>
          </div>
        </div>
        {/* Budha Halwai Food Card */}
        <div className="food-container">
          <div className="food-card reversed">
            <div className="card-content">
              <div className="text-content">
                <h3>Budha Halwai</h3>
                <p>
                  <span className="location-icon">📍</span>
                  Behind Bhadrakali Mandir Road, Naikwadi Pura, Tivandha chowk,
                  Nashik
                </p>
              </div>
              <div className="image-content">
                <img src={budhaHalwaiImg} alt="Budha Halwai" />
              </div>
            </div>
          </div>
        </div>

        {/* Shoukin Bhel Food Card */}
        <div className="food-container">
          <div className="food-card">
            <div className="card-content">
              <div className="text-content">
                <h3>Shoukin Bhel</h3>
                <p>
                  <span className="location-icon">📍</span>
                  Shop no. 3, Nikunj apt, near, Vidya Vikas Cir, Yashogandha
                  Society, Patil Colony, Canada Corner, Nashik
                </p>
              </div>
              <div className="image-content">
                <img src={shoukinBhelImg} alt="Shoukin Bhel" />
              </div>
            </div>
          </div>
        </div>

        <div className="food-container">
          {/* Nadan Thali Food Card */}
          <div className="food-card reversed">
            <div className="card-content">
              <div className="text-content">
                <h3>Nadan Thali</h3>
                <p>
                  <span className="location-icon">📍</span>
                  Laxmi Vijay Commercial complex Jatra Hotel Road, Aurangabad
                  Rd, Nandur Naka, Nashik
                </p>
              </div>
              <div className="image-content">
                <img src={nadanThaliImg} alt="Nadan Thali" />
              </div>
            </div>
          </div>
        </div>

        <div className="food-container">
          {/* Shagun Thali Food Card */}
          <div className="food-card">
            <div className="card-content">
              <div className="text-content">
                <h3>Shagun Thali</h3>
                <p>
                  <span className="location-icon">📍</span>
                  Seawood Park, Gangapur Rd, beside Linen Club, nr. Khatib
                  Dairy, Old Gangapur Naka, Shreerang Nagar, Nashik
                </p>
              </div>
              <div className="image-content">
                <img src={shagunThaliImg} alt="Shagun Thali" />
              </div>
            </div>
          </div>
        </div>

        <div className="food-container">
          {/* Samarth Juice Centre Food Card */}
          <div className="food-card reversed">
            <div className="card-content">
              <div className="text-content">
                <h3>Samarth Juice Centre</h3>
                <p>
                  <span className="location-icon">📍</span>
                  Pethe High School Compound, Sarkar Wada, Raviwar Karanja,
                  Panchavati, Nashik
                </p>
              </div>
              <div className="image-content">
                <img src={samarthJuiceImg} alt="Samarth Juice Centre" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Robot />
      <Footer />
    </div>
  );
};

export default NearFoodPlace;
