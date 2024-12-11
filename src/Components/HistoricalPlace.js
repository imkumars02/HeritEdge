import React, { useState, useEffect } from "react";
import "./HistoricalPlace.scss";
import DashboardNavBar from "../NavBar/DashboardNavBar";
import Footer from "../Footer";
import Robot from "../Robot";
import historical from "../Images/historical.png";
import sayantaraImg from "../Images/pandavleni.jpeg.jpg";
import budhaHalwaiImg from "../Images/gargoti.jpg";
import shoukinBhelImg from "../Images/coin-museum.jpg";
import nadanThaliImg from "../Images/artillery_museum.jpeg.jpg";
import shagunThaliImg from "../Images/ramshej.jpeg.jpg";
import samarthJuiceImg from "../Images/savarkar_wada.jpeg.jpg";
import { FaStar, FaDirections } from "react-icons/fa";

const places = [
  {
    name: "Pandavleni",
    location: "Located about 8km south of the center of Nashik, Maharashtra",
    image: sayantaraImg,
    wikipediaTitle: "Pandavleni_Caves",
    description:
      "Pandavleni Caves, also known as Trirashmi Caves, are a group of 24 caves carved between the 3rd century BCE and the 2nd century CE, representing Hinayana Buddhism architecture.",
    reviews: [
      {
        author: "John D.",
        rating: 4,
        text: "Fascinating historical site with intricate carvings.",
      },
      {
        author: "Sarah M.",
        rating: 5,
        text: "A must-visit for history enthusiasts!",
      },
    ],
    directions:
      "Take the Mumbai-Agra Highway (NH-3) south from Nashik. The caves are located on a hill near Anjaneri.",
  },
  {
    name: "Gargoti Museum",
    location: "D-59, MIDC, MIDC Area, Sinner, Maharashtra",
    image: budhaHalwaiImg,
    wikipediaTitle: "Gargoti_Museum",
    description:
      "Gargoti Museum, also known as Gargoti Mineral Museum, is India's largest gem and mineral museum, showcasing a vast collection of zeolites and other minerals from the Deccan Plateau.",
    reviews: [
      {
        author: "Emily R.",
        rating: 5,
        text: "Incredible collection of minerals. The displays are stunning!",
      },
      {
        author: "Michael T.",
        rating: 4,
        text: "Educational and visually impressive. Great for geology enthusiasts.",
      },
    ],
    directions:
      "Located in the MIDC area of Sinnar, about 30 km from Nashik city. Take the Nashik-Pune Highway (NH-50) and follow signs to Sinnar MIDC.",
  },
  {
    name: "Coin Museum",
    location:
      "INHCRF Campus, Opposite Grape County Resort, Near Vadholi, Trambakeshwar Rd, Phata, Nashik, Maharashtra",
    image: shoukinBhelImg,
    wikipediaTitle: "Indian_Institute_of_Research_in_Numismatic_Studies",
    description:
      "The Coin Museum, part of the Indian Institute of Research in Numismatic Studies, houses an extensive collection of coins from various periods of Indian history, offering insights into the economic and cultural aspects of different eras.",
    reviews: [
      {
        author: "David L.",
        rating: 4,
        text: "Fascinating collection for numismatists and history buffs.",
      },
      {
        author: "Priya S.",
        rating: 5,
        text: "Well-organized displays with informative descriptions.",
      },
    ],
    directions:
      "Located on Trimbak Road, about 15 km from Nashik city center. Take the Nashik-Trimbakeshwar Road and follow signs to the museum.",
  },
  {
    name: "Artillery Museum",
    location:
      "Artillery Centre Rd, Aute Nagar, Gandhi Nagar Airport Area, Deolali Gaon, Nashik, Maharashtra",
    image: nadanThaliImg,
    wikipediaTitle: "Artillery_Museum",
    description:
      "The Artillery Museum in Deolali showcases the evolution of artillery in the Indian Army, featuring a wide range of guns, howitzers, and other artillery equipment used throughout history.",
    reviews: [
      {
        author: "Robert M.",
        rating: 5,
        text: "Impressive collection of artillery. A must-visit for military history enthusiasts.",
      },
      {
        author: "Anjali P.",
        rating: 4,
        text: "Well-maintained museum with knowledgeable staff.",
      },
    ],
    directions:
      "Located in Deolali, about 16 km from Nashik city. Take the Nashik-Pune Highway (NH-50) and follow signs to Deolali Cantonment.",
  },
  {
    name: "Ramshej Fort",
    location: "Ramshej Fort, Ramshej, Maharashtra 422003",
    image: shagunThaliImg,
    wikipediaTitle: "Ramshej_Fort",
    description:
      "Ramshej Fort is a hill fort located in the Western Ghats, offering panoramic views of the surrounding landscape. It has historical significance dating back to the Maratha Empire.",
    reviews: [
      {
        author: "Amit K.",
        rating: 4,
        text: "Challenging trek with rewarding views at the top.",
      },
      {
        author: "Lisa W.",
        rating: 5,
        text: "Beautiful fort with rich history. The trek is worth it!",
      },
    ],
    directions:
      "Located about 10 km from Nashik city. Take the Nashik-Trimbakeshwar Road and follow signs to Ramshej Fort. The last part requires a trek to reach the fort.",
  },
  {
    name: "Savarkar Wada Centre",
    location:
      "Lakshmi Narayan Galli, near Post Office, Gosavi Wada, Vijay Nagar, Bhagur, Deolali, Maharashtra",
    image: samarthJuiceImg,
    wikipediaTitle: "Savarkar_Smarak",
    description:
      "Savarkar Wada Centre is the birthplace of Vinayak Damodar Savarkar, an Indian independence activist and politician. The house has been converted into a memorial showcasing Savarkar's life and work.",
    reviews: [
      {
        author: "Rahul S.",
        rating: 5,
        text: "Informative museum about Savarkar's life. Well-preserved historical site.",
      },
      {
        author: "Meera G.",
        rating: 4,
        text: "Interesting glimpse into the life of a controversial historical figure.",
      },
    ],
    directions:
      "Located in Bhagur, about 11 km from Nashik city. Take the Nashik-Pune Highway (NH-50) and follow signs to Bhagur.",
  },
];

const HistoricalPlace = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [wikipediaInfo, setWikipediaInfo] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (selectedPlace) {
      fetchWikipediaInfo(selectedPlace.wikipediaTitle);
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [selectedPlace]);

  const fetchWikipediaInfo = async (title) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${title}`
      );
      const data = await response.json();
      setWikipediaInfo(data.extract || "No information available");
    } catch (error) {
      console.error("Error fetching Wikipedia info:", error);
      setWikipediaInfo("Failed to load information. Please try again later.");
    }
  };

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
      <div className="near-historical-place">
        <div className="title">
          <img src={historical} alt="Historical Places" />
          <h2>Historical Places</h2>
        </div>

        <div className="historical-container">
          {places.map((place, index) => (
            <div
              key={index}
              className={`historical-card ${index % 2 === 0 ? "" : "reversed"}`}
              onClick={() => handlePlaceClick(place)}
            >
              <div className="card-content">
                <div className="text-content">
                  <h3>{place.name}</h3>
                  <p>
                    <span className="location-icon">📍</span>
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
      </div>

      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <button onClick={closeSidebar} className="close-btn">
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
              <h3>Wikipedia</h3>
              <p>{wikipediaInfo}</p>
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

export default HistoricalPlace;
