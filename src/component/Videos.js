import { Avatar } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import NearMeIcon from "@material-ui/icons/NearMe";
import React, { useRef, useState } from "react";
import "./css/Video.css";
import Ticker from "react-ticker";
import { useEffect } from "react";

function Videos({
  id,
  src,
  channel,
  description,
  like,
  dislike,
  share,
  comment,
  profile,
}) {
  const [likes, setLikes] = useState(false);
  const [subs, setSubs] = useState(false);

  const handleLike = () => {
    setLikes(!likes);
  };

  const videoRef = useRef(null);
  // videoRef.current.play();

  const attemptPlay = async () => {
    videoRef &&
      videoRef.current &&
      (await videoRef.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      }));
  };
  useEffect(() => {
    attemptPlay();
  }, []);
  const handleSubscribe = () => {
    setSubs((sub) => !sub);
  };

  return (
    <div className="video">
      <video
        id={id}
        className="video__player"
        loop
        playsInline
        ref={videoRef}
        src={src}
        autoplay
      />

      <div className="shortsContainer">
        <div className="shortsVideoTop">
          <div className="shortsVideoTopIcon">
            <ArrowBackIcon />
          </div>
          <div className="shortsVideoTopIcon">
            <MoreVertIcon />
          </div>
        </div>
        <div className="shortsVideoSideIcons">
          <div className="shortsVideoSideIcon">
            <button
              onClick={handleLike}
              style={{
                background: likes ? "red" : "transparent",
                border: "none",
              }}
            >
              <ThumbUpIcon />
            </button>
            <p>{like}</p>
          </div>
          <div className="shortsVideoSideIcon">
            <ThumbDownIcon />
            <p>{dislike}</p>
          </div>
          <div className="shortsVideoSideIcon">
            <InsertCommentIcon />
            <p>{comment}</p>
          </div>

          <div className="shortsVideoSideIcon">
            <NearMeIcon />
            <p>{share}</p>
          </div>
        </div>
        <div className="shortsBottom">
          <div className="shortsDesc">
            <Ticker mode="smooth">
              {({ index }) => (
                <>
                  <p className="description">{description}</p>
                </>
              )}
            </Ticker>
          </div>
          <div className="shortDetails">
            <Avatar src={profile} />
            <p>{channel}</p>
            <button
              style={{
                background: subs ? "red" : "hsla(0,0%,69.4%,.609)",
              }}
              onClick={handleSubscribe}
            >
              {subs ? "SUBSCRIBED" : "SUBSCRIBE"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Videos;
