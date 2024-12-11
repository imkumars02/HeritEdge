import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.scss";
// import { MapPin } from "lucide-react";

// Importing images
import trimbakImage from "./Images/Map/trimbak.jpeg";
import kalaramImage from "./Images/Map/kalaram.jpeg";
import kapaleshwarImage from "./Images/Map/kapaleshwar.jpeg";
import tapovanImage from "./Images/Map/tapovan.jpeg";
import sadhagramImage from "./Images/Map/sadhugram.webp";
import ramkundImage from "./Images/Map/ramkund.jpg";
import sitaImage from "./Images/Map/sita.jpg";
import KumbhNavBar from "./KumbhPages/KumbhNavBar";
import Footer from "./Footer";

const Map = () => {
  const [map, setMap] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [currentRoute, setCurrentRoute] = useState(null);

  const kumbhNodes = [
    {
      name: "Trimbakeshwar Temple",
      coords: [19.9404, 73.5425],
      info: {
        en: "Trimbak is a city and a municipal council in Nashik District in the Indian state of Maharashtra. The Trimbakeshwar Shiva Temple is located here, one of the twelve Jyotirlingas, where the Hindu genealogy registers at Trimbakeshwar, Maharashtra are kept. The origin of the sacred Godavari River is near Trimbak",
        hi: "त्रिंबक महाराष्ट्र के नासिक जिले में स्थित एक शहर और नगर परिषद है। यहाँ त्र्यंबकेश्वर शिव मंदिर स्थित है, जो बारह ज्योतिर्लिंगों में से एक है, और जहाँ हिंदू वंशावली के अभिलेख रखे जाते हैं। पवित्र गोदावरी नदी का उद्गम भी त्रिंबक के पास ही है।",
        mr: "त्र्यंबकेश्वर हे बाराही ज्योतिर्लिंगांपैकी एक आहे.",
        es: "Trimbakeshwar es uno de los doce Jyotirlingas dedicados al Señor Shiva.",
        fr: "Trimbakeshwar est l'un des douze Jyotirlingas dédiés au Seigneur Shiva.",
      },
      image: trimbakImage,
    },
    {
      name: "Kalaram Mandir",
      coords: [20.007, 73.7919],
      info: {
        en: "Kalaram Temple, is a Hindu temple in Nashik of Nashik district in Maharashtra, dedicated to the deity Rama. It is a temple situated in Panchavati area of the Nashik. The temple derives its name from a black statue of Rama. The literal translation of kalaram is black Rama",
        hi: "कालाराम मंदिर महाराष्ट्र के नासिक जिले के नासिक शहर में स्थित एक हिंदू मंदिर है, जो भगवान राम को समर्पित है। यह मंदिर नासिक के पंचवटी क्षेत्र में स्थित है। इस मंदिर का नाम भगवान राम की काली प्रतिमा से लिया गया है। कालाराम का शाब्दिक अर्थ है काला राम।",
        mr: "कालाराम मंदिर हे भगवान रामांना समर्पित प्राचीन मंदिर आहे.",
        es: "El Templo Kalaram es un antiguo templo dedicado al Señor Rama.",
        fr: "Le temple Kalaram est un ancien temple dédié au Seigneur Rama.",
      },
      image: kalaramImage,
    },
    {
      name: "Kapaleshwar Mandir",
      coords: [20.0006, 73.7892],
      info: {
        en: "Kapaleshwar temple is among the oldest temple which is located near Ram Kund of Nashik. This temple is around six hundred years old temple which is built in the year 1763 and later it was renovated by Peshwa Dynasty. Temple is located on top and once has to climb around 50 steps to reach to main entrance.",
        hi: "कापलेश्वर मंदिर नासिक के रामकुंड के निकट स्थित एक प्राचीन मंदिर है। यह मंदिर लगभग छह सौ वर्ष पुराना है और 1763 में निर्मित किया गया था। बाद में इसे पेशवा वंश द्वारा पुनर्निर्मित किया गया था। यह मंदिर एक पहाड़ी की चोटी पर स्थित है, और मुख्य प्रवेश द्वार तक पहुँचने के लिए लगभग 50 सीढ़ियाँ चढ़नी पड़ती हैं।",
        mr: "कपालेश्वर मंदिर हे नाशिकमधील भगवान शिवाला समर्पित सर्वात जुने मंदिर आहे.",
        es: "El templo Kapaleshwar es uno de los templos más antiguos de Nashik dedicado al Señor Shiva.",
        fr: "Le temple Kapaleshwar est l'un des plus anciens temples de Nashik dédié au Seigneur Shiva.",
      },
      image: kapaleshwarImage,
    },
    {
      name: "Tapovan",
      coords: [20.0111, 73.7977],
      info: {
        en: "Tapovan, located in Nashik, Maharashtra, is a destination that offers a harmonious blend of natural beauty, spiritual significance, and historical richness. Situated along the banks of the sacred Godavari River, Tapovan is renowned for its lush greenery, captivating landscapes, and serene ambience.",
        hi: "तपोवन, नासिक, महाराष्ट्र में स्थित एक स्थान है जो प्राकृतिक सुंदरता, आध्यात्मिक महत्व और ऐतिहासिक समृद्धता का अनोखा संगम प्रस्तुत करता है। पवित्र गोदावरी नदी के किनारे स्थित तपोवन अपनी हरियाली, मनोरम दृश्यों और शांत वातावरण के लिए प्रसिद्ध है।",
        mr: "तपोवन शांत वातावरण आणि रामायणाशी असलेल्या संबंधासाठी प्रसिद्ध आहे.",
        es: "Tapovan es conocido por sus alrededores serenos y su conexión con el Ramayana.",
        fr: "Tapovan est connu pour ses environs paisibles et sa connexion au Ramayana.",
      },
      image: tapovanImage,
    },
    {
      name: "Sadhugram",
      coords: [20.021, 73.7769],
      info: {
        en: "The tents are to be put up on 500 acres at Sadhugram - the place in Tapovan where sadhus stay during the Kumbh Mela. In the previous Kumbh Mela held in 2015, the NMC had installed around 2,000 tents on 318 acres.",
        hi: "तंबू साधुग्राम में 500 एकड़ में लगाए जाएंगे - यह तपोवन का वह स्थान है जहाँ कुम्भ मेला के दौरान साधु ठहरते हैं। 2015 में आयोजित पिछले कुम्भ मेले में, NMC ने 318 एकड़ में लगभग 2,000 तंबू लगाए थे।",
        mr: "साधुग्राम हे कुंभमेळ्यादरम्यान संतांचे तात्पुरते निवासस्थान आहे.",
        es: "Sadhugram es el asentamiento temporal para los santos durante el Kumbh Mela.",
        fr: "Sadhugram est le lieu de résidence temporaire des saints pendant le Kumbh Mela.",
      },
      image: sadhagramImage,
    },
    {
      name: "Ramkund",
      coords: [20.0037, 73.7899],
      info: {
        en: "This is the holiest spot in Nashik as it is believed to be the place where Lord Rama used to bathe. It contains the bone dissolving Asthivilaya Tirth. It was built by Chitrarao Khatav, a landholder of Khatav in Satara in 1696havrao and was repaired by Gopikabai, the mother of Madhavrao the fourth Peshva. Peoples bring ashes of their deceased relatives and immerse it in Asthivilay kund.",
        hi: "यह नासिक का सबसे पावन स्थान माना जाता है, क्योंकि विश्वास किया जाता है कि यहाँ भगवान राम स्नान करते थे। इसमें अस्थिविलय तीर्थ है, जो अस्थियों को घुलाकर समाप्त करने की प्रक्रिया के लिए प्रसिद्ध है। यह स्थान 1696 में खताव के चितराराव खताव द्वारा बनाया गया था, जो सतारा के खताव इलाके के एक जमींदार थे। बाद में इसे माधवराव पेशवा की मां, गोपिकाबाई द्वारा मरम्मत कराया गया। लोग अपने मृत रिश्तेदारों की अस्थियाँ यहाँ अस्थिविलय कुंड में विसर्जित करते हैं।",
        mr: "रामकुंड हे नाशिकमधील सर्वात पवित्र स्थान आहे जिथे भाविक कुंभमेळ्यादरम्यान स्नान करतात.",
        es: "Ramkund es el lugar más sagrado de Nashik, donde los devotos se bañan durante el Kumbh Mela.",
        fr: "Ramkund est le lieu le plus sacré de Nashik, où les dévots se baignent pendant le Kumbh Mela.",
      },
      image: ramkundImage,
    },
    {
      name: "Sita Cave",
      coords: [19.9936, 73.7516],
      info: {
        en: "Sita Gupha is situated in Panchawati area about 3 km away from the Nashik Central bus stand. It is said that Seeta stayed in this caves for some days during exile(Vanvas). The deities of Ram, Seeta and Laxman are placed inside the first main gummpha. In the second small gupha there is a Shivling . The main reason attributed for the Shivling is that Seeta used to worship God Shiva and she never took her meals before worshiping him.",
        hi: "सिता गुफा पंचवटी क्षेत्र में नासिक केंद्रीय बस स्टैंड से लगभग 3 किलोमीटर की दूरी पर स्थित है। कहा जाता है कि सीता ने वनवास के दौरान कुछ दिनों तक इस गुफा में निवास किया था। पहली मुख्य गुफा में राम, सीता और लक्ष्मण की प्रतिमाएँ रखी गई हैं। दूसरी छोटी गुफा में एक शिवलिंग है। शिवलिंग के होने का मुख्य कारण यह है कि सीता भगवान शिव की पूजा किया करती थीं और उनकी पूजा के बिना भोजन ग्रहण नहीं करती थीं।",
        mr: "सीता गुफा ही ऐतिहासिक गुहा आहे जिथे सीतेने वनवासाच्या काळात काही काळ व्यतीत केला असे मानले जाते.",
        es: "La cueva de Sita es una cueva histórica donde se cree que Sita permaneció durante su exilio.",
        fr: "La grotte de Sita est une grotte historique où l'on pense que Sita est restée pendant son exil.",
      },
      image: sitaImage,
    },
  ];

  const routes = {
    "Railway Station": [
      [19.9916, 73.7836],
      [20.008, 73.7835],
      [20.013, 73.763],
      [19.9987, 73.7948],
      [19.9946, 73.7881],
      [20.011, 73.7689],
      [19.9773, 73.7749],
      [19.9404, 73.5389],
      [19.931, 73.511],
    ],
    "Bus Stand": [
      [19.9972, 73.7843],
      [20.008, 73.7835],
      [20.013, 73.763],
      [19.9987, 73.7948],
      [20.01, 73.76],
      [20.011, 73.7689],
      [19.9773, 73.7749],
      [19.931, 73.511],
      [20.0004, 73.7901],
    ],
    Airport: [
      [20.1198, 73.9124],
      [20.013, 73.763],
      [19.9987, 73.7948],
      [19.985, 73.783],
      [20.011, 73.7689],
      [19.9773, 73.7749],
      [19.9404, 73.5389],
      [19.931, 73.511],
    ],
  };

  useEffect(() => {
    if (!map) return;
  
    const bounds = kumbhNodes.map((node) => node.coords);
    map.fitBounds(bounds);
  }, [map, kumbhNodes]); // Add kumbhNodes as a dependency
  

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const speak = (text, lang) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Speech synthesis is not supported in this browser");
    }
  };

  const handleMarkerClick = (node) => {
    speak(node.info[selectedLanguage], selectedLanguage);
  };

  const displayRoute = (startingPoint) => {
    const route = routes[startingPoint];
    setCurrentRoute(route);
    if (map) {
      map.fitBounds(route);
    }
  };

  const customIcon = L.divIcon({
    className: "custom-icon",
    html: `<div style="color: #0000FF;"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24],
  });

  return (
    <>
      <KumbhNavBar />
      <div className="map-container">
        <h1>Kumbh Mela Nashik Tour</h1>
        <div className="controls">
          <label htmlFor="language">Select Language:</label>
          <select
            id="language"
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="mr">Marathi</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>
          <label htmlFor="starting-point">Select Starting Point:</label>
          <select
            id="starting-point"
            onChange={(e) => displayRoute(e.target.value)}
          >
            <option value="">Select a starting point</option>
            <option value="Railway Station">Railway Station</option>
            <option value="Bus Stand">Bus Stand</option>
            <option value="Airport">Airport</option>
          </select>
        </div>
        <MapContainer
          center={[19.9975, 73.7898]}
          zoom={13}
          whenCreated={setMap}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {kumbhNodes.map((node, index) => (
            <Marker
              key={index}
              position={node.coords}
              icon={customIcon}
              eventHandlers={{
                click: () => handleMarkerClick(node),
              }}
            >
              <Popup>
                <h3>{node.name}</h3>
                <img
                  src={node.image}
                  alt={node.name}
                  style={{ width: "100%", height: "auto", margin: "10px 0" }}
                />
                <p>{node.info[selectedLanguage]}</p>
              </Popup>
            </Marker>
          ))}
          {currentRoute && (
            <Polyline positions={currentRoute} color="blue" weight={4} />
          )}
        </MapContainer>
      </div>
      <Footer />
    </>
  );
};

export default Map;
