import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./FAQ.scss";
// import logo from "./Images/logo.png";
import Footer from "./Footer";
import DashboardNavBar from "./NavBar/DashboardNavBar";

const FAQ = () => {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const faqData = [
    {
      question: "What is this project about?",
      answer:
        "Our aim is combine technology and tradition to enhance the experience of the Kumbh Mela. From navigation to virtual tours, we aim to make this grand event accessible, inclusive, and sustainable for everyone.",
    },
    {
      question: "What is the Trip Planner feature?",
      answer:
        "Trip planner designed to help attendees make the most of their visit. It provides recommendations for rituals, landmarks, and events based on the user's preferences and available time",
    },
    {
      question: "How can I use the interactive map?",
      answer:
        "The interactive map guides users through the Kumbh Mela by highlighting key locations, rituals, and facilities. With multilingual voice-over, it provides step-by-step navigation to ensure visitors can easily find their way around the even",
    },
    {
      question: "What if I cannot attend the Kumbh Mela in person?",
      answer:
        "We offer virtual tours and live streaming options for those who cannot attend in person.",
    },
    {
      question: "How does the volunteer registration work",
      answer:
        "Volunteer registration is a simple process through our online portal. Fill out the form with your details and areas of interest.",
    },
  ];

  const handleQuestionClick = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  return (
    <div className="faq-page">
      <DashboardNavBar />

      <main className="main-content">
        <div className="faq-container">
          <div className="faq-header">
            <h1>Freqeuntly Asked Questions</h1>
            <p className="subtitle">Still Need Help? Contact us</p>
          </div>

          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${
                  activeQuestion === index ? "active" : ""
                }`}
                onClick={() => handleQuestionClick(index)}
              >
                <h3 className="question">{faq.question}</h3>
                <div className="answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
