import React, { useState, useEffect, useRef } from "react";
import "./Robot.scss";
import bot from "./Images/bot.png";

const Robot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en-US");
  const chatContainerRef = useRef(null);

  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  const synth = window.speechSynthesis;

  useEffect(() => {
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = selectedLanguage;
  
    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setInputText(transcript);
      handleSendMessage(transcript); // Use of handleSendMessage
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
  
    return () => {
      recognition.stop();
    };
  }, [selectedLanguage, recognition]);
  

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const getBotResponse = (text) => {
    const lowerText = text.toLowerCase();
    if (lowerText.includes("hello") || lowerText.includes("hi")) {
      return "Hello! How can I help you today?";
    } else if (lowerText.includes("how are you")) {
      return "I'm doing well, thank you for asking! How about you?";
    } else if (lowerText.includes("bye") || lowerText.includes("goodbye")) {
      return "Goodbye! Have a great day!";
    } else if (
      lowerText.includes("thank you") ||
      lowerText.includes("thanks")
    ) {
      return "You're welcome! Is there anything else I can help you with?";
    } else if (lowerText.includes("weather")) {
      return "I'm sorry, I don't have access to real-time weather information. You might want to check a weather app or website for that.";
    } else if (lowerText.includes("name")) {
      return "My name is ChatBot. It's nice to meet you!";
    } else {
      return "I'm not sure how to respond to that. Can you please rephrase or ask me something else?";
    }
  };

  const handleSendMessage = (text = inputText) => {
    if (text.trim() === "") return;

    const newMessage = { text, isUser: true };
    setMessages([...messages, newMessage]);
    setInputText("");

    // Get bot response
    setTimeout(() => {
      const botResponse = { text: getBotResponse(text), isUser: false };
      setMessages((prevMessages) => [...prevMessages, botResponse]);
      speakText(botResponse.text);
    }, 1000);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
    setIsListening(!isListening);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = selectedLanguage;
    synth.speak(utterance);
  };

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  return (
    <div className="Robot">
      <img src={bot} alt="Robot" onClick={handleClick} />
      {isChatOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>Chatbot</h3>
            <button onClick={handleClick}>Close</button>
          </div>
          <div className="chat-messages" ref={chatContainerRef}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.isUser ? "user" : "bot"}`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Type your message..."
            />
            <button onClick={() => handleSendMessage()}>Send</button>
            <button onClick={toggleListening}>
              {isListening ? "Stop Listening" : "Start Listening"}
            </button>
            <select value={selectedLanguage} onChange={handleLanguageChange}>
              <option value="en-US">English</option>
              <option value="es-ES">Spanish</option>
              <option value="fr-FR">French</option>
              <option value="de-DE">German</option>
              <option value="hi-HI">Hindi</option>
              <option value="it-IT">Italian</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Robot;
