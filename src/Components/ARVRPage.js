import React, { useState } from "react";
import "./ARVRPage.scss";
import image from "../Images/ARImage.jpg";
import { useNavigate } from "react-router-dom";
import apkFile from "../Images/ARmandir3.apk";


const ARVRPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigation = useNavigate();
  // Function to handle the download
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = apkFile;
    // link.href = "apkFile";
    link.download = "ARVRApp.apk";
    link.click();
  };

  // Function to handle closing the modal
  const closeModal = () => {
    setIsVisible(false);
  };

  return (
    <div className="ARVR">
      <h1 className="ARVRheading">Try These Features</h1>
      <div className="Container">
        <div className="Games" onClick={()=>{navigation('/GameSelection')}}>
          <img src={image} alt="Game" />
          <h1 className="heading">Games</h1>
        </div>
        <div
          className="AR"
          onClick={() => {
            setIsVisible(true);
          }}
        >
          <img src={image} alt="AR" />
          <h1 className="heading">AR</h1>
        </div>
        <div className="VR" onClick={()=>{navigation('/VRBooking')}}>
          <img src={image} alt="VR" />
          <h1 className="heading">VR</h1>
        </div>
      </div>
      <p className="Comming">New Features Coming Soon</p>

      {isVisible && (
        <div className="Modal">
          <div className="Modal-content">
            <div className="Modal-header">
              <button onClick={closeModal} className="CloseButton">
                &times;
              </button>
            </div>
            <div className="ModalContainer">
              <div className="Modal-body">
                <p>Click below to download the AR app:</p>
                <button onClick={handleDownload} className="DownloadButton">
                  Download APK
                </button>
              </div>
              <div className="Modal-body1">
               <img  src={image} alt="AR App" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ARVRPage;
