import React, { useState } from "react";
import "./Gallery.scss";
import v1 from "../Images/Video/Video-226.mp4";
import v2 from "../Images/Video/Video-369.mp4";
import v3 from "../Images/Video/Video-397.mp4";
import v4 from "../Images/Video/Video-591.mp4";
import v5 from "../Images/Video/Video-689.mp4";
import v6 from "../Images/Video/Video-946.mp4";
import thumb from "../Images/kumbh.jpg";
import Footer from "../Footer";
import KumbhNavBar from "./KumbhNavBar";

const Gallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const videos = [
    {
      id: 1,
      url: v1,
      thumbnail: thumb,
    },
    {
      id: 2,
      url: v2,
      thumbnail: thumb,
    },
    {
      id: 3,
      url: v3,
      thumbnail: thumb,
    },
    {
      id: 4,
      url: v4,
      thumbnail: thumb,
    },
    {
      id: 5,
      url: v5,
      thumbnail: thumb,
    },
    {
      id: 6,
      url: v6,
      thumbnail: thumb,
    },
  ];

  const openVideo = (video) => {
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <KumbhNavBar />
      <div className="galleryContainer">
        <h1 className="galleryHeading">Video Gallery</h1>
        <div className="video-grid">
          {videos.map((video) => (
            <div
              key={video.id}
              className="video-container"
              onClick={() => openVideo(video)}
            >
              <img src={video.thumbnail} alt={`Video ${video.id}`} />
              <div className="play-icon">▶</div>
            </div>
          ))}
        </div>
        {selectedVideo && (
          <div className="fullscreen-video">
            <div className="close-button" onClick={closeVideo}>
              ×
            </div>
            <video src={selectedVideo.url} controls autoPlay />
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
