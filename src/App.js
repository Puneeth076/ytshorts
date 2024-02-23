import { useEffect, useState } from "react";
import "./App.css";
import Videos from "./component/Videos";
import axios from "axios";

function App() {
  const [ytVideo, setYtVideo] = useState([]);
  const api = process.env.PIXABAY_API;
  useEffect(() => {
    async function fetchVideos() {
      const response = await axios
        .get(
          "https://pixabay.com/api/videos/?key=42511771-c93888ea1826c17066c0d51a3&q=youtube&pretty=true"
        )
        .then((res) => res.data.hits)
        .catch((err) => console.log(err));
      //console.log(response);

      setYtVideo(response);
      return response;
    }
    fetchVideos();
  }, []);
  return (
    <>
      <div className="app">
        <div className="app__videos">
          {ytVideo.map((vid, index) => (
            <Videos
              key={index}
              id={index}
              src={vid.videos.small.url}
              channel={vid.user}
              description={vid.tags}
              like={vid.likes}
              dislike={vid.comments}
              share={vid.views}
              comment={vid.comments}
              profile={vid.userImageURL}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
