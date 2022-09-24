import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;

const fetchGifs = ({ keyword }) => {
  const [gifUrl, setGifUrl] = useState("");

  const fetchGif = async () => {
    try {
      const gif = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword
          .split(" ")
          .join("")}&limit=1`
      )?.then(
        async (r) =>
          await r
            .json()
            ?.then((json) => json?.data?.[0]?.images?.downsized_medium?.url)
      );
      if (!gif)
        throw new Error(
          "Wrong/Invalid Gift has been Fetched from GIPHY Api [PUBLIC]"
        );
      else setGifUrl(gif);
    } catch {
      setGifUrl(
        "https://metro.co.uk/wp-content/uploads/2015/05/pokemon_crying.gif?quality=90&strip=all&zoom=1&resize=500%2C284"
      );
    }
  };

  useEffect(() => {
    if (keyword) fetchGif();
  }, [keyword]);

  return gifUrl;
};

export default fetchGifs;
