import React, { useState, useEffect } from "react";
import "./home.css";
import img1 from "../models/Frame 1.png";
import img2 from "../models/Frame 2.png";
import img3 from "../models/Frame 3.png";
import img4 from "../models/Frame 4.png";
import img5 from "../models/Frame 5.png";
import img6 from "../models/Frame 6.png";
import img7 from "../models/Frame 7.png";
import img8 from "../models/Frame 8.png";

const Home: React.FC = () => {
  const [randomImage, setRandomImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  let images = [img1, img2, img3, img4, img5, img6, img7, img8];

    const randomIndex = Math.floor(Math.random() * images.length);
    const selectedImage = images[randomIndex];

    const imageLoader = new Image();
    imageLoader.src = selectedImage;
    imageLoader.onload = () => {
      setRandomImage(selectedImage);
      setIsLoading(false);
    };
  }, []);


  return (
    <>
      <div className="app-body">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          randomImage && <img src={randomImage} alt="Loaded"></img>
        )}
      </div>
    </>
  );
};

export default Home;
