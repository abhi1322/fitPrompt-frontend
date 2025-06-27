import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPlayer from "react-player";
import { Skeleton } from "../ui/skeleton";

const VideoFrame = ({ exercise }) => {
  const [videoId, setVideoId] = useState("");
  const [error, setError] = useState("");
  // console.log(exercise);
  console.log(error);

  // useEffect(() => {
  //   const fetchVideo = async () => {
  //     if (!exercise) return;

  //     try {
  //       const response = await axios.get(
  //         "https://www.googleapis.com/youtube/v3/search",
  //         {
  //           params: {
  //             part: "snippet",
  //             q: `${exercise} exercise demo`,
  //             type: "video",
  //             maxResults: 1,
  //             key: API_KEY,
  //           },
  //         }
  //       );

  //       if (response.data.items.length > 0) {
  //         const video = response.data.items[0];
  //         setVideoId(video.id.videoId);
  //         setError("");

  //         console.log("Video ID:", video.id.videoId);
  //       } else {
  //         setVideoId("");
  //         setError("No video found for this exercise.");
  //       }
  //     } catch (err) {
  //       console.error("Error fetching video:", err);
  //       setError("Failed to fetch video.");
  //     }
  //   };

  //   fetchVideo();
  // }, [exercise, API_KEY]);

  const YOUTUBE_DATA_V3_API_KEY = import.meta.env
    .VITE_APP_YOUTUBE_DATA_V3_API_KEY;
  useEffect(() => {
    const fetchVideo = async () => {
      if (!exercise) return;

      try {
        const response = await axios.get(
          "https://youtube-v3-alternative.p.rapidapi.com/search",
          {
            params: {
              query: `${exercise} exercise demo`,
              maxResults: "1",
            },
            headers: {
              "x-rapidapi-key": YOUTUBE_DATA_V3_API_KEY,
              "x-rapidapi-host": "youtube-v3-alternative.p.rapidapi.com",
            },
          }
        );

        if (response.data?.data?.length > 0) {
          const video = response.data.data[0];
          setVideoId(video.videoId);
          setError("");
          console.log("Video ID:", video.videoId);
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
  }, [exercise]);

  return (
    <div>
      {videoId ? (
        <>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${videoId}`}
            playing={false}
            // controls={false}
            width="100%"
            height="200px"
            config={{
              youtube: {
                playerVars: {
                  autoplay: 0,
                  controls: 0,
                  modestbranding: 1,
                  rel: 0,
                  showinfo: 0,
                  fs: 0,
                  iv_load_policy: 3,
                },
              },
            }}
          />
        </>
      ) : (
        <Skeleton className="flex justify-center items-center w-full h-[200px] rounded-b-none">
          <p className="opacity-20">Video Loading</p>
        </Skeleton>
      )}
    </div>
  );
};

export default VideoFrame;
