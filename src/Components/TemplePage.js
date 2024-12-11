import React, { useState, useEffect } from "react";
import "./TemplePage.scss";
import DashboardNavBar from "../NavBar/DashboardNavBar";
import Footer from "../Footer";
import Robot from "../Robot";
import { FaStar, FaDirections } from "react-icons/fa";
import sayantaraImg from "../Images/img18.jpg";
import budhaHalwaiImg from "../Images/kalaram.jpeg";
import shoukinBhelImg from "../Images/kapaleshwar.jpg";
import nadanThaliImg from "../Images/swami_narayan.png";
import shagunThaliImg from "../Images/slider7.jpg";
import samarthJuiceImg from "../Images/img3.jpg";

const temples = [
  {
    name: "Trimbekeshware",
    location: "Trimbakeshwar Rd, Anjaneri, Maharashtra",
    image: sayantaraImg,
    description:
      "Trimbakeshwar Temple is an ancient Hindu temple dedicated to Lord Shiva. It's one of the twelve Jyotirlingas and is known for its unique three-faced lingam representing Brahma, Vishnu, and Shiva.",
    reviews: [
      {
        author: "Rahul M.",
        rating: 5,
        text: "A spiritually uplifting experience. The architecture is breathtaking.",
      },
      {
        author: "Priya S.",
        rating: 4,
        text: "Peaceful atmosphere. The trek to the temple is quite refreshing.",
      },
    ],
    directions:
      "Located 28 km from Nashik city. Take the Trimbakeshwar Road and follow signs to the temple.",
  },
  {
    name: "Kalaram Mandir",
    location:
      "Nirman upavan C-3, Sita Gufaa Rd, opposite Kalaram Temple East door, Panchavati, Nashik, Maharashtra",
    image: budhaHalwaiImg,
    description:
      "Kalaram Temple is a famous shrine dedicated to Lord Rama. It's known for its black idol of Rama and its historical significance in the Dalit movement led by Dr. B.R. Ambedkar.",
    reviews: [
      {
        author: "Amit K.",
        rating: 5,
        text: "Beautiful temple with rich history. The architecture is stunning.",
      },
      {
        author: "Sneha P.",
        rating: 4,
        text: "Peaceful atmosphere. The evening aarti is a must-see.",
      },
    ],
    directions:
      "Located in Panchavati area of Nashik. Easily accessible by auto-rickshaw or local bus.",
  },
  {
    name: "Kapaleshwar Mandir",
    location: "Panchavati, Nashik, Maharashtra",
    image: shoukinBhelImg,
    description:
      "Kapaleshwar Temple is an ancient Shiva temple located in the Panchavati area. It's believed to be the place where Lord Shiva granted a boon to Ravana.",
    reviews: [
      {
        author: "Vijay L.",
        rating: 5,
        text: "Serene temple with beautiful architecture. Less crowded compared to other temples.",
      },
      {
        author: "Meera R.",
        rating: 4,
        text: "Peaceful atmosphere. The temple has a unique energy.",
      },
    ],
    directions:
      "Located in Panchavati area. Take any local transport to Panchavati and ask for directions to Kapaleshwar Temple.",
  },
  {
    name: "Swaminarayan Temple",
    location:
      "Mumbai - Agra Rd, near Dental college Kevdivan, Panchavati, Nashik, Maharashtra 422003",
    image: nadanThaliImg,
    description:
      "The Swaminarayan Temple in Nashik is a beautiful example of modern Hindu architecture. It's dedicated to Bhagwan Swaminarayan and is known for its intricate carvings and peaceful atmosphere.",
    reviews: [
      {
        author: "Sanjay M.",
        rating: 4,
        text: "Beautiful architecture and well-maintained premises. Very peaceful.",
      },
      {
        author: "Anita G.",
        rating: 5,
        text: "The marble work is exquisite. The evening aarti is a divine experience.",
      },
    ],
    directions:
      "Located on Mumbai-Agra Road near Dental College. Easily reachable by auto-rickshaw or local bus.",
  },
  {
    name: "Saptashringi Devi",
    location:
      "Shree Saptashrungi nivasini devi mandir, near datta mandir, Saptashrungi, Maharashtra",
    image: shagunThaliImg,
    description:
      "Saptashringi is a site of Hindu pilgrimage situated 60 km from Nashik. It's one of the 51 Shakti Peethas and is known for its temple of goddess Saptashringi Nivasini.",
    reviews: [
      {
        author: "Rajesh P.",
        rating: 5,
        text: "The view from the top is breathtaking. The spiritual energy is palpable.",
      },
      {
        author: "Kavita S.",
        rating: 4,
        text: "The trek is challenging but worth it. The temple is beautiful and peaceful.",
      },
    ],
    directions:
      "Located about 60 km from Nashik. Take a bus or hire a taxi from Nashik to reach Saptashringi.",
  },
  {
    name: "Gondeshwar Temple Centre",
    location:
      "Gondeshwar temple road, vijay nagar, sinnar, Nashik, Maharashtra",
    image: samarthJuiceImg,
    description:
      "Gondeshwar Temple is an 11th-century temple dedicated to Lord Shiva. It's known for its intricate carvings and beautiful architecture reminiscent of the Khajuraho temples.",
    reviews: [
      {
        author: "Nikhil D.",
        rating: 4,
        text: "A hidden gem with beautiful architecture. The carvings are exquisite.",
      },
      {
        author: "Pooja T.",
        rating: 5,
        text: "Peaceful atmosphere and rich history. A must-visit for history and architecture enthusiasts.",
      },
    ],
    directions:
      "Located in Sinnar, about 30 km from Nashik. Take a bus or taxi from Nashik to Sinnar and follow signs to Gondeshwar Temple.",
  },
];

const TemplePage = () => {
  const [selectedTemple, setSelectedTemple] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (selectedTemple) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
  }, [selectedTemple]);

  const handleTempleClick = (temple) => {
    setSelectedTemple(temple);
  };

  const closeSidebar = () => {
    setSelectedTemple(null);
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
      <main className="near-temple-place">
        <div className="title">
          <h1>Temples</h1>
        </div>
        <div className="temple-container">
          {temples.map((temple, index) => (
            <div
              key={temple.name}
              className={`temple-card ${index % 2 !== 0 ? "reversed" : ""}`}
              onClick={() => handleTempleClick(temple)}
            >
              <div className="card-content">
                <div className="text-content">
                  <h2>{temple.name}</h2>
                  <p>
                    <span className="location-icon" aria-hidden="true">
                      📍
                    </span>
                    <span className="sr-only">Location:</span>
                    {temple.location}
                  </p>
                </div>
                <div className="image-content">
                  <img src={temple.image} alt={temple.name} />
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
        {selectedTemple && (
          <div className="sidebar-content">
            <h2>{selectedTemple.name}</h2>
            <img
              src={selectedTemple.image}
              alt={selectedTemple.name}
              className="sidebar-image"
            />
            <div className="sidebar-section">
              <h3>Description</h3>
              <p>{selectedTemple.description}</p>
            </div>
            <div className="sidebar-section">
              <h3>Reviews</h3>
              {selectedTemple.reviews.map((review, index) => (
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
                {selectedTemple.directions}
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

export default TemplePage;
