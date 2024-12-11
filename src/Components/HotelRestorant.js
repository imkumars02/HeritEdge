import React, { useState, useEffect } from "react";
import "./HotelRestorant.scss";
import DashboardNavBar from "../NavBar/DashboardNavBar";
import Footer from "../Footer";
import Robot from "../Robot";
import { FaStar, FaDirections } from "react-icons/fa";
import sayantaraImg from "../Images/Ginger.webp";
import budhaHalwaiImg from "../Images/Ginger.webp";
import shoukinBhelImg from "../Images/gateway.webp";
import nadanThaliImg from "../Images/flower-park.jpeg.jpg";
import shagunThaliImg from "../Images/8.jpeg.jpg";
import samarthJuiceImg from "../Images/Rarangan.jpg";

const hotelRestaurants = [
  {
    name: "Ginger Nashik",
    location:
      "Trimbakeshwar Rd, near Satpur, MIDC, Police Station, Nashik, Maharashtra",
    image: sayantaraImg,
    description:
      "Ginger Nashik offers a comfortable stay with modern amenities and convenient location near the MIDC area.",
    reviews: [
      {
        author: "Rahul M.",
        rating: 4,
        text: "Clean rooms and friendly staff. Good value for money.",
      },
      {
        author: "Priya S.",
        rating: 5,
        text: "Excellent location for business travelers. The in-house restaurant is great.",
      },
    ],
    directions:
      "Located on Trimbakeshwar Road, near Satpur MIDC. Easy to reach by cab or auto-rickshaw.",
  },
  {
    name: "Hotel Panchavad Pride",
    location: "Dindori Rd, Adityakunj Society, Panchavati, Nashik, Maharashtra",
    image: budhaHalwaiImg,
    description:
      "Hotel Panchavad Pride offers a luxurious stay in the heart of Nashik's Panchavati area, known for its religious significance.",
    reviews: [
      {
        author: "Amit K.",
        rating: 5,
        text: "Excellent service and beautiful rooms. The location is perfect for pilgrims.",
      },
      {
        author: "Sneha P.",
        rating: 4,
        text: "Great amenities and helpful staff. The restaurant serves delicious food.",
      },
    ],
    directions:
      "Located on Dindori Road in Panchavati area. Easily accessible by car or auto-rickshaw.",
  },
  {
    name: "Gateway Nashik",
    location: "P-17, Mumbai - Agra Rd, MIDC Ambad, Nashik, 422010, India",
    image: shoukinBhelImg,
    description:
      "Gateway Nashik is a premium hotel offering world-class amenities and services for both business and leisure travelers.",
    reviews: [
      {
        author: "Vijay L.",
        rating: 5,
        text: "Luxurious rooms and excellent service. The spa is a must-try!",
      },
      {
        author: "Meera R.",
        rating: 4,
        text: "Great business facilities and comfortable stay. The breakfast buffet is impressive.",
      },
    ],
    directions:
      "Located on Mumbai-Agra Road in MIDC Ambad. Easy to reach by car or taxi from the airport or railway station.",
  },
  {
    name: "Curry Leaves Bhavan",
    location:
      "Near Cycle Circle, College Rd, Krishi Nagar, Nashik, Maharashtra",
    image: nadanThaliImg,
    description:
      "Curry Leaves Bhavan is a popular restaurant known for its authentic South Indian cuisine and vegetarian thalis.",
    reviews: [
      {
        author: "Sanjay M.",
        rating: 4,
        text: "Delicious South Indian food. The dosas are crispy and the sambhar is flavorful.",
      },
      {
        author: "Anita G.",
        rating: 5,
        text: "Great variety in their thali. The service is quick and the ambiance is nice.",
      },
    ],
    directions:
      "Located near Cycle Circle on College Road. Easily reachable by auto-rickshaw or local bus.",
  },
  {
    name: "Flying Monk",
    location:
      "3rd floor, Archit Arcade, College Rd, behind Big Bazaar, Ramdas Colony, Nashik, Maharashtra",
    image: shagunThaliImg,
    description:
      "Flying Monk is a trendy restaurant offering a fusion of Asian cuisines with a modern twist.",
    reviews: [
      {
        author: "Rajesh P.",
        rating: 5,
        text: "Innovative menu with great flavors. The sushi and dim sum are must-try!",
      },
      {
        author: "Kavita S.",
        rating: 4,
        text: "Cool ambiance and good music. The cocktails are creative and tasty.",
      },
    ],
    directions:
      "Located on the 3rd floor of Archit Arcade on College Road, behind Big Bazaar. Easily accessible by cab or auto-rickshaw.",
  },
  {
    name: "Tarangan Planetarium",
    location:
      "Opp Asaram Bapu Aashram Bridge, Near Nandawan Lawns, Savarkar Nagar Extension, Off, Gangapur Rd, Nashik, Maharashtra",
    image: samarthJuiceImg,
    description:
      "While not a hotel or restaurant, Tarangan Planetarium offers an educational and entertaining experience for astronomy enthusiasts.",
    reviews: [
      {
        author: "Nikhil D.",
        rating: 4,
        text: "Informative shows and interesting exhibits. Great for kids and adults alike.",
      },
      {
        author: "Pooja T.",
        rating: 5,
        text: "The night sky show is mesmerizing. The staff is knowledgeable and friendly.",
      },
    ],
    directions:
      "Located opposite Asaram Bapu Ashram Bridge, near Nandawan Lawns. Take Gangapur Road and follow signs to the planetarium.",
  },
];

const HotelRestorant = () => {
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
      <main className="near-hotel-restaurant-place">
        <div className="title">
          <h1>Hotels and Restaurants</h1>
        </div>
        <div className="hotel-restaurant-container">
          {hotelRestaurants.map((spot, index) => (
            <div
              key={spot.name}
              className={`hotel-restaurant-card ${
                index % 2 !== 0 ? "reversed" : ""
              }`}
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

export default HotelRestorant;
