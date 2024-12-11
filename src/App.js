import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Login/Register";
import ExplorePages from "./Components/ExplorePages";
import HomePage from "./Components/HomePage";
import ExplorePage from "./Components/ExplorePage";
import NearFoodPlace from "./Components/NearFoodPlace";
import TemplePage from "./Components/TemplePage";
import HistoricalPlace from "./Components/HistoricalPlace";
import Trekking from "./Components/Trekking";
import MisalSpot from "./Components/MisalSpot";
import OtherPlace from "./Components/otherPlace";
import HotelRestorant from "./Components/HotelRestorant";
import KumbhPage from "./KumbhPages/KumbhPage";
import UserProfile from "./UserProfile";
import HeritEdgeDiary from "./Components/HeritEdgeDiary";
import Feedback from "./Feedback";
import VolunteerRegistration from "./KumbhPages/VolunteerRegistration";
import Destination from "./Destination";
import Schedule from "./KumbhPages/Schedule";
import PlanTrip from "./KumbhPages/PlanTrip";
import About from "./About";
import FAQ from "./FAQ";
import VRBooking from "./Components/VRBooking";
import GameSelection from "./Components/GameSelection";
import WordSearch from "./Components/WordSearch";
import CandyCrush from "./Components/CandyCrush";
import Map from "./Map";
import PlanPri from "./KumbhPages/PlanPri";
import Gallery from "./KumbhPages/Gallery";
import LanguageSelector from "./Components/LanguageSelector";
// import "./styles/main.scss";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="modal-close" onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

const App = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const [translatedContent, setTranslatedContent] = useState({});

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setModalOpen(true);
    }, 45 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const translateContent = useCallback(async (content, targetLang) => {
    const url =
      "https://google-translate113.p.rapidapi.com/api/v1/translator/html";
    const options = {
      method: "POST",
      headers: {
        "x-rapidapi-key": "4245138331msh287c3bba06f4013p1ad6ccjsn82337d6fa672",
        "x-rapidapi-host": "google-translate113.p.rapidapi.com",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "en",
        to: targetLang,
        html: content,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      return result.trans;
    } catch (error) {
      console.error("Translation error:", error);
      return content;
    }
  }, []);

  const handleLanguageChange = async (newLanguage) => {
    setLanguage(newLanguage);
    if (newLanguage !== "en") {
      const contentToTranslate = document.body.innerHTML;
      const translated = await translateContent(
        contentToTranslate,
        newLanguage
      );
      setTranslatedContent({ [newLanguage]: translated });
    } else {
      setTranslatedContent({});
    }
  };

  useEffect(() => {
    if (language !== "en" && translatedContent[language]) {
      document.body.innerHTML = translatedContent[language];
    }
  }, [language, translatedContent]);

  return (
    <BrowserRouter>
      <div className="app-header">
        <LanguageSelector onLanguageChange={handleLanguageChange} />
      </div>
      <Routes>
        <Route path="/Feedback" element={<Feedback />} />
        <Route path="/PlanTrip" element={<PlanTrip />} />
        <Route path="/Schedule" element={<Schedule />} />
        <Route path="/Destination" element={<Destination />} />
        <Route
          path="/VolunteerRegistration"
          element={<VolunteerRegistration />}
        />
        <Route path="/HeritEdgeDiary" element={<HeritEdgeDiary />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/KumbhPage" element={<KumbhPage />} />
        <Route path="/HotelRestorant" element={<HotelRestorant />} />
        <Route path="/OtherPlace" element={<OtherPlace />} />
        <Route path="/MisalSpot" element={<MisalSpot />} />
        <Route path="/Trekking" element={<Trekking />} />
        <Route path="/HistoricalPlace" element={<HistoricalPlace />} />
        <Route path="/TemplePage" element={<TemplePage />} />
        <Route path="/NearFoodPlace" element={<NearFoodPlace />} />
        <Route path="/ExplorePages" element={<ExplorePages />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/" element={<ExplorePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/About" element={<About />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/VRBooking" element={<VRBooking />} />
        <Route path="/GameSelection" element={<GameSelection />} />
        <Route path="/WordSearch" element={<WordSearch />} />
        <Route path="/CandyCrush" element={<CandyCrush />} />
        <Route path="/Map" element={<Map />} />
        <Route path="/PlanPri" element={<PlanPri />} />
        <Route path="/Gallery" element={<Gallery />} />
      </Routes>

      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h2>Reminder</h2>
        <p>You've been browsing for 45 minutes. Take a break!</p>
      </Modal>
    </BrowserRouter>
  );
};

export default App;
