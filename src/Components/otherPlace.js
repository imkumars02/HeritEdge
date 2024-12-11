import React, { useState, useEffect } from "react";
import "./otherPlace.scss";
import DashboardNavBar from "../NavBar/DashboardNavBar";
import Footer from "../Footer";
import Robot from "../Robot";
import { FaStar, FaDirections } from "react-icons/fa";
import sayantaraImg from "../Images/trampolin.jpeg.jpg";
import budhaHalwaiImg from "../Images/Boat-club.jpg";
import shoukinBhelImg from "../Images/pahine.jpeg.jpg";
import nadanThaliImg from "../Images/flower-park.jpeg.jpg";
import shagunThaliImg from "../Images/birkpark.jpeg.jpg";
import samarthJuiceImg from "../Images/Rarangan.jpg";

const otherPlaces = [
  {
    name: "Trampoline Park",
    location:
      "Shop No.5, Deshpande Building, Shop No.113, Bhadrakali Fruit Market, 1419, Bhadrakali Rd, Bhadrakali, Koknipura, Nashik",
    image: sayantaraImg,
    description:
      "Trampoline Park offers a fun-filled experience for all ages. Jump, flip, and bounce on various trampolines and enjoy other activities in a safe environment.",
    reviews: [
      {
        author: "Rahul M.",
        rating: 5,
        text: "Great place for kids and adults alike. Had a blast!",
      },
      {
        author: "Priya S.",
        rating: 4,
        text: "Good fun, but can get crowded on weekends. Go on weekdays if possible.",
      },
    ],
    directions:
      "Located in the Bhadrakali area. Easy to reach by auto-rickshaw or cab from any part of Nashik.",
  },
  {
    name: "MTDC Boat Club",
    location:
      "Behind Bhadrakali Mandir Road, Naikwadi Pura, Tivandha chowk, Nashik",
    image: budhaHalwaiImg,
    description:
      "MTDC Boat Club offers a serene boating experience on the Godavari River. Enjoy pedal boats, motor boats, and the beautiful surroundings.",
    reviews: [
      {
        author: "Amit K.",
        rating: 4,
        text: "Peaceful boat ride with nice views. Good for a relaxing evening.",
      },
      {
        author: "Sneha P.",
        rating: 5,
        text: "Loved the sunset boat ride. A must-visit place in Nashik.",
      },
    ],
    directions:
      "Located behind Bhadrakali Temple. Easily accessible by auto-rickshaw or local bus.",
  },
  {
    name: "Pahine Waterfall",
    location: "Pahine, Maharashtra 422206",
    image: shoukinBhelImg,
    description:
      "Pahine Waterfall is a hidden gem near Nashik. It offers a refreshing escape with its cascading waters and lush surroundings.",
    reviews: [
      {
        author: "Vijay L.",
        rating: 5,
        text: "Beautiful waterfall! The trek to reach it is enjoyable too.",
      },
      {
        author: "Meera R.",
        rating: 4,
        text: "Serene spot, but can get crowded during monsoons. Visit early for a peaceful experience.",
      },
    ],
    directions:
      "Located about 40 km from Nashik. Take the Nashik-Trimbakeshwar road and then follow signs to Pahine village.",
  },
  {
    name: "Flower Park",
    location: "Gangapur Road, Nashik, Maharashtra 422005",
    image: nadanThaliImg,
    description:
      "Flower Park is a beautiful garden showcasing a variety of flowers and plants. It's a perfect spot for nature lovers and photography enthusiasts.",
    reviews: [
      {
        author: "Sanjay M.",
        rating: 4,
        text: "Colorful and well-maintained park. Great for morning walks.",
      },
      {
        author: "Anita G.",
        rating: 5,
        text: "Beautiful flowers and landscaping. A peaceful oasis in the city.",
      },
    ],
    directions:
      "Located on Gangapur Road. Easily accessible by auto-rickshaw or local bus from any part of Nashik.",
  },
  {
    name: "Nandur Madhyameshwar Bird Sanctuary",
    location:
      "Back to Nandur Madhyameshwar water reserve dam, Chapadgaon, Maharashtra",
    image: shagunThaliImg,
    description:
      "Nandur Madhyameshwar Bird Sanctuary is a haven for bird watchers. It hosts numerous migratory birds and offers beautiful landscapes.",
    reviews: [
      {
        author: "Rajesh P.",
        rating: 5,
        text: "Paradise for bird lovers. Saw so many species in one visit!",
      },
      {
        author: "Kavita S.",
        rating: 4,
        text: "Peaceful sanctuary with great biodiversity. Bring a good camera and binoculars.",
      },
    ],
    directions:
      "Located about 40 km from Nashik. Take the Nashik-Aurangabad highway and follow signs to Nandur Madhyameshwar.",
  },
  {
    name: "Ranangan",
    location: "Holaram Colony, Sharanpur, Nashik, Maharashtra",
    image: samarthJuiceImg,
    description:
      "Ranangan is a popular amusement park in Nashik offering various rides and attractions for all age groups.",
    reviews: [
      {
        author: "Nikhil D.",
        rating: 4,
        text: "Fun place for family outings. Good variety of rides and activities.",
      },
      {
        author: "Pooja T.",
        rating: 5,
        text: "Great amusement park with something for everyone. The water park section is especially enjoyable.",
      },
    ],
    directions:
      "Located in Sharanpur area. Easily reachable by auto-rickshaw or cab from any part of Nashik.",
  },
];

const OtherPlace = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (selectedPlace) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [selectedPlace]);

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const closeSidebar = () => {
    setSelectedPlace(null);
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
      <main className="near-otherPlace-place">
        <div className="title">
          <h1>Other Places</h1>
        </div>
        <div className="otherPlace-container">
          {otherPlaces.map((place, index) => (
            <div
              key={place.name}
              className={`otherPlace-card ${index % 2 !== 0 ? "reversed" : ""}`}
              onClick={() => handlePlaceClick(place)}
            >
              <div className="card-content">
                <div className="text-content">
                  <h2>{place.name}</h2>
                  <p>
                    <span className="location-icon" aria-hidden="true">
                      📍
                    </span>
                    <span className="sr-only">Location:</span>
                    {place.location}
                  </p>
                </div>
                <div className="image-content">
                  <img src={place.image} alt={place.name} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button
          onClick={closeSidebar}
          className="close-btn"
          aria-label="Close sidebar"
        >
          ×
        </button>
        {selectedPlace && (
          <div className="sidebar-content">
            <h2>{selectedPlace.name}</h2>
            <img
              src={selectedPlace.image}
              alt={selectedPlace.name}
              className="sidebar-image"
            />
            <div className="sidebar-section">
              <h3>Description</h3>
              <p>{selectedPlace.description}</p>
            </div>
            <div className="sidebar-section">
              <h3>Reviews</h3>
              {selectedPlace.reviews.map((review, index) => (
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
                {selectedPlace.directions}
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

export default OtherPlace;
