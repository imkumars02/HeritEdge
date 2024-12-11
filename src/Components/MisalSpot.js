import React, { useState, useEffect } from "react";
import "./MisalSpot.scss";
import DashboardNavBar from "../NavBar/DashboardNavBar";
import Footer from "../Footer";
import Robot from "../Robot";
import MisalSpotlogo from "../Images/misal_illustration.jpg";
import sayantaraImg from "../Images/sadhana.jpg";
import budhaHalwaiImg from "../Images/grape_embassy.jpg";
import shoukinBhelImg from "../Images/patlacha-wada.avif";
import nadanThaliImg from "../Images/peruchi_wadi.jpeg.jpg";
import shagunThaliImg from "../Images/Shamsunder_misal.jpeg.jpg";
import samarthJuiceImg from "../Images/MisalPav.jpg";
import { FaStar, FaDirections } from "react-icons/fa";

const misalSpots = [
  {
    name: "Sadhana Chulivarchi Misal",
    location:
      "Shop No.5, Deshpande Building, Shop No.113, Bhadrakali Fruit Market, 1419, Bhadrakali Rd, Bhadrakali, Koknipura, Nashik",
    image: sayantaraImg,
    description:
      "Famous for its traditional Maharashtrian misal, Sadhana Chulivarchi Misal offers a spicy and flavorful experience.",
    reviews: [
      {
        author: "Rahul M.",
        rating: 5,
        text: "Best misal in Nashik! The spice level is perfect.",
      },
      {
        author: "Priya S.",
        rating: 4,
        text: "Authentic taste and great ambiance. A must-visit for misal lovers.",
      },
    ],
    directions:
      "Located in the heart of Nashik, near Bhadrakali temple. Easy to reach by auto or cab.",
  },
  {
    name: "Grape Embassy",
    location: "Near Suyojit Bridge, Road, Makhmalabad, Gangapur, Nashik",
    image: budhaHalwaiImg,
    description:
      "Grape Embassy offers a unique twist on traditional misal, incorporating local grape flavors into their recipes.",
    reviews: [
      {
        author: "Amit K.",
        rating: 4,
        text: "Interesting fusion of grape flavors with misal. Worth trying!",
      },
      {
        author: "Sneha P.",
        rating: 5,
        text: "The ambiance is great, and the misal is delicious. Loved the grape twist.",
      },
    ],
    directions:
      "Located near Suyojit Bridge. Easily accessible by car or auto-rickshaw.",
  },
  {
    name: "Patilwada",
    location: "Near Suyojit Bridge, Road, Makhmalabad, Gangapur, Nashik",
    image: shoukinBhelImg,
    description:
      "Patilwada is known for its rustic ambiance and traditional Maharashtrian misal recipe passed down through generations.",
    reviews: [
      {
        author: "Vijay L.",
        rating: 5,
        text: "Authentic misal taste. Feels like eating at a traditional Maharashtrian home.",
      },
      {
        author: "Meera R.",
        rating: 4,
        text: "Great taste and generous portions. The ambiance adds to the experience.",
      },
    ],
    directions:
      "Located in Gangapur area. Take the road towards Suyojit Bridge and look for signs to Patilwada.",
  },
  {
    name: "Peruchi Wadi",
    location:
      "Mungsare Phata Makhmalabad Girnare, highway, Nashik, Maharashtra",
    image: nadanThaliImg,
    description:
      "Peruchi Wadi offers a unique outdoor dining experience with their special misal recipe that includes local spices.",
    reviews: [
      {
        author: "Sanjay M.",
        rating: 4,
        text: "Great outdoor setting. The misal has a unique flavor that's worth trying.",
      },
      {
        author: "Anita G.",
        rating: 5,
        text: "Loved the atmosphere and the misal was delicious. Perfect for a weekend outing.",
      },
    ],
    directions:
      "Located on the highway near Mungsare Phata. Look for signs to Peruchi Wadi.",
  },
  {
    name: "ShyamSundar Misal",
    location:
      "H.No.704/0487, P.no.738, opposite Rungta High School, Ashok Stambh, Nashik, Maharashtra 422001",
    image: shagunThaliImg,
    description:
      "ShyamSundar Misal is a local favorite, known for its consistent quality and traditional Nashik-style misal.",
    reviews: [
      {
        author: "Rajesh P.",
        rating: 5,
        text: "Been coming here for years. The taste never disappoints!",
      },
      {
        author: "Kavita S.",
        rating: 4,
        text: "Authentic Nashik misal. The spice level is perfect for most palates.",
      },
    ],
    directions:
      "Located opposite Rungta High School near Ashok Stambh. Easily reachable by auto or local bus.",
  },
  {
    name: "Vitthala Misal",
    location:
      "Jijau Farms, Peth Rd, Shankar Nagar, Tavli Phata, Nashik, Maharashtra 422003",
    image: samarthJuiceImg,
    description:
      "Vitthala Misal offers a blend of traditional and modern misal recipes, catering to diverse taste preferences.",
    reviews: [
      {
        author: "Nikhil D.",
        rating: 4,
        text: "Good variety of misal options. The modern twist on traditional recipes is interesting.",
      },
      {
        author: "Pooja T.",
        rating: 5,
        text: "Excellent taste and presentation. The staff is friendly and the place is always clean.",
      },
    ],
    directions:
      "Located near Jijau Farms on Peth Road. Take the road towards Tavli Phata and look for signs to Vitthala Misal.",
  },
];

const MisalSpot = () => {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (selectedSpot) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [selectedSpot]);

  const handleSpotClick = (spot) => {
    setSelectedSpot(spot);
  };

  const closeSidebar = () => {
    setSelectedSpot(null);
  };

  const renderStars = (rating) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <FaStar key={i} className={i < rating ? "star filled" : "star"} />
      ));
  };

  return (
    <div className="page-container">
      <DashboardNavBar />
      <main className="near-misal-spot-place">
        <div className="title">
          <img src={MisalSpotlogo} alt="MisalSpot" />
          <h1>MisalSpot Places</h1>
        </div>
        <div className="misal-spot-container">
          {misalSpots.map((spot, index) => (
            <div
              key={spot.name}
              className={`misal-spot-card ${index % 2 !== 0 ? "reversed" : ""}`}
              onClick={() => handleSpotClick(spot)}
            >
              <div className="card-content">
                <div className="text-content">
                  <h2>{spot.name}</h2>
                  <p>
                    <span className="location-icon" aria-hidden="true">
                      📍
                    </span>
                    <span className="sr-only">Location:</span>
                    {spot.location}
                  </p>
                </div>
                <div className="image-content">
                  <img src={spot.image} alt={`${spot.name} Misal`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button onClick={closeSidebar} className="close-btn">
          ×
        </button>
        {selectedSpot && (
          <div className="sidebar-content">
            <h2>{selectedSpot.name}</h2>
            <img
              src={selectedSpot.image}
              alt={selectedSpot.name}
              className="sidebar-image"
            />
            <div className="sidebar-section">
              <h3>Description</h3>
              <p>{selectedSpot.description}</p>
            </div>
            <div className="sidebar-section">
              <h3>Reviews</h3>
              {selectedSpot.reviews.map((review, index) => (
                <div key={index} className="review">
                  <div className="review-header">
                    <span className="review-author">{review.author}</span>
                    <span className="review-rating">
                      {renderStars(review.rating)}
                    </span>
                  </div>
                  <p className="review-text">{review.text}</p>
                </div>
              ))}
            </div>
            <div className="sidebar-section">
              <h3>Directions</h3>
              <p>
                <FaDirections className="directions-icon" />{" "}
                {selectedSpot.directions}
              </p>
            </div>
          </div>
        )}
      </div>

      <Robot />
      <Footer />
    </div>
  );
};

export default MisalSpot;
