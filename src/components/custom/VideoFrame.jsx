import React, { useState, useEffect } from "react";
import axios from "axios";

const VideoFrame = ({ exercise }) => {
  const [videoId, setVideoId] = useState("");
  const [error, setError] = useState("");
  const API_KEY = import.meta.env.VITE_APP_YOUTUBE_DATA_V3_API_KEY;

  useEffect(() => {
    const fetchVideo = async () => {
      if (!exercise) return;

      try {
        const response = await axios.get(
          "https://www.googleapis.com/youtube/v3/search",
          {
            params: {
              part: "snippet",
              q: `${exercise} exercise demo`,
              type: "video",
              maxResults: 1,
              key: API_KEY,
            },
          }
        );

        if (response.data.items.length > 0) {
          const video = response.data.items[0];
          setVideoId(video.id.videoId);
          setError("");

          console.log("Video ID:", video.id.videoId);
        } else {
          setVideoId("");
          setError("No video found for this exercise.");
        }
      } catch (err) {
        console.error("Error fetching video:", err);
        setError("Failed to fetch video.");
      }
    };

    fetchVideo();
  }, [exercise, API_KEY]);

  return (
    <div style={{ marginTop: "2rem", textAlign: "center" }}>
      <h3>Video result for: {exercise}</h3>
      {videoId ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Workout Demo"
        ></iframe>
      ) : (
        <p>{error || "Loading..."}</p>
      )}
    </div>
  );
};

export default VideoFrame;
