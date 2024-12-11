import React, { useState, useEffect } from "react";
import "./Trekking.scss";
import DashboardNavBar from "../NavBar/DashboardNavBar";
import Footer from "../Footer";
import Robot from "../Robot";
import { FaStar, FaDirections } from "react-icons/fa";
import sayantaraImg from "../Images/hairhar.jpeg.jpg";
import budhaHalwaiImg from "../Images/anjineri.jpeg.jpg";
import shoukinBhelImg from "../Images/ramshej.jpeg.jpg";
import nadanThaliImg from "../Images/dehargad.jpeg.jpg";
import shagunThaliImg from "../Images/salher.jpg";
import samarthJuiceImg from "../Images/Brahmagiri.jpg";

const trekkingSpots = [
  {
    name: "Harihar Fort",
    location:
      "Harihar fort / Harshagad is a fort located 40 km from Nashik City, 48 km from Igatpuri, 40 km from Ghoti in Nashik district, of Maharashtra, India",
    image: sayantaraImg,
    description:
      "Harihar Fort, also known as Harshagad, is famous for its near-vertical climb to the top. The fort offers breathtaking views of the surrounding landscape and is known for its unique rock-cut steps.",
    reviews: [
      {
        author: "Rahul M.",
        rating: 5,
        text: "Challenging trek but worth every step. The views are incredible!",
      },
      {
        author: "Priya S.",
        rating: 4,
        text: "A must-do for adventure enthusiasts. The final climb is thrilling.",
      },
    ],
    directions:
      "Take the Nashik-Trimbakeshwar road and turn towards Nirgudsar village. The trek starts from here.",
  },
  {
    name: "Anjaneri Fort",
    location:
      "Anjaneri fort, Trimbakeshwar, Nashik district, Maharashtra, 422213",
    image: budhaHalwaiImg,
    description:
      "Anjaneri Fort is believed to be the birthplace of Lord Hanuman. The trek offers a mix of natural beauty and mythological significance, with several caves and temples along the way.",
    reviews: [
      {
        author: "Amit K.",
        rating: 5,
        text: "Beautiful trek with religious significance. The view from the top is amazing.",
      },
      {
        author: "Sneha P.",
        rating: 4,
        text: "Moderate difficulty trek. The caves and temples add to the experience.",
      },
    ],
    directions:
      "Located about 20 km from Nashik. Take the Nashik-Trimbakeshwar road and follow signs to Anjaneri village.",
  },
  {
    name: "Ramshej Fort",
    location:
      "Ramsej or Ramshej Fort is a small fort located 10 kilometres north-west of Nashik, in the Indian state of Maharashtra",
    image: shoukinBhelImg,
    description:
      "Ramshej Fort is known for its strategic location and historical importance. The trek offers panoramic views of the surrounding hills and valleys, with interesting architectural features on the fort.",
    reviews: [
      {
        author: "Vijay L.",
        rating: 4,
        text: "Relatively easy trek with great views. The fort's history is fascinating.",
      },
      {
        author: "Meera R.",
        rating: 5,
        text: "Perfect for a day trip from Nashik. The trek is enjoyable and not too strenuous.",
      },
    ],
    directions:
      "Take the Nashik-Dindori road and turn towards Vani. The trek starts from the base village of Khedgaon.",
  },
  {
    name: "Dehergad Fort",
    location:
      "Dehergad, Old Girnare Gangapur Rd, Deherewadi, Maharashtra 422003",
    image: nadanThaliImg,
    description:
      "Dehergad Fort is a lesser-known gem near Nashik. The trek offers a peaceful experience with fewer crowds and beautiful views of the Gangapur Dam and surrounding areas.",
    reviews: [
      {
        author: "Sanjay M.",
        rating: 4,
        text: "Hidden gem! The trek is relatively easy and the views are spectacular.",
      },
      {
        author: "Anita G.",
        rating: 5,
        text: "Loved the solitude and natural beauty. Perfect for those seeking a quiet adventure.",
      },
    ],
    directions:
      "Take the Old Gangapur Road from Nashik and head towards Deherewadi. The trek starts from the base village.",
  },
  {
    name: "Salher Fort",
    location: "Salher Baglan, Nashik District, Maharashtra, 423302",
    image: shagunThaliImg,
    description:
      "Salher Fort is the highest fort in Maharashtra and offers a challenging trek. Known for its historical significance and stunning views, it's a favorite among experienced trekkers.",
    reviews: [
      {
        author: "Rajesh P.",
        rating: 5,
        text: "Challenging trek but the views are unparalleled. A true test of endurance!",
      },
      {
        author: "Kavita S.",
        rating: 4,
        text: "The fort's history and architecture are impressive. Prepare for a strenuous climb.",
      },
    ],
    directions:
      "Located about 150 km from Nashik. Take the Nashik-Malegaon road and then head towards Salher village in Baglan taluka.",
  },
  {
    name: "Brahmagiri",
    location: "Brahmagiri Metghar Killa, Maharashtra 422212",
    image: samarthJuiceImg,
    description:
      "Brahmagiri is the source of the Godavari River and holds great religious significance. The trek combines natural beauty with spiritual importance, offering a unique experience.",
    reviews: [
      {
        author: "Nikhil D.",
        rating: 5,
        text: "Spiritual and adventurous. The trek to the source of Godavari is mesmerizing.",
      },
      {
        author: "Pooja T.",
        rating: 4,
        text: "Moderate trek with beautiful scenery. The temples add to the spiritual atmosphere.",
      },
    ],
    directions:
      "Located near Trimbakeshwar, about 30 km from Nashik. Take the Nashik-Trimbakeshwar road and follow signs to Brahmagiri.",
  },
];

const Trekking = () => {
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
      <main className="near-trekking-place">
        <div className="title">
          <h1>Trekking Places</h1>
        </div>
        <div className="trekking-container">
          {trekkingSpots.map((spot, index) => (
            <div
              key={spot.name}
              className={`trekking-card ${index % 2 !== 0 ? "reversed" : ""}`}
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
                  <img src={spot.image} alt={spot.name} />
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

export default Trekking;
