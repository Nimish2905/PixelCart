import React from "react";
import "./store.css";
import img1 from "../models/cards/jordan-max-aura-4-shoes-cKMcXJ-PhotoRoom 1.png";
import img2 from "../models/cards/air-jordan-1-mid-se-shoes-CF3K5m-PhotoRoom 1.png";
import img3 from "../models/cards/air-jordan-1-mid-se-shoes-cHNJ3B-PhotoRoom 1.png";
import img4 from "../models/cards/tatum-1-home-team-pf-basketball-shoes-JbXhDt-PhotoRoom 1.png";
import img5 from "../models/cards/jumpman-mvp-shoes-JV1HCs-PhotoRoom 1.png";
import img6 from "../models/cards/zion-3-pf-basketball-shoes-vTjpz4-PhotoRoom 1.png";
import img7 from "../models/cards/air-jordan-2-low-origins-shoes-DcLNNF-PhotoRoom 1.png";
import img8 from "../models/cards/jumpman-two-trey-shoes-rhmBzG (1)-PhotoRoom 1.png";
import img9 from "../models/cards/jordan-one-take-5-pf-shoes-jNx9SV-PhotoRoom 1.png";
import img10 from "../models/cards/air-jordan-1-zoom-cmft-2-shoes-nX8Qqx-PhotoRoom 1.png";
import img11 from "../models/cards/luka-2-bred-pf-basketball-shoes-LM9ScX-PhotoRoom 1.png";
import img12 from "../models/cards/air-jordan-1-shoes-d1vgvb-PhotoRoom 1.png";
import img13 from "../models/cards/jordan-spizike-low-chinese-new-year-shoes-LNdJ8J-PhotoRoom 1.png";

interface items {
  src: string;
  name: string;
  price: number;
}
const Store: React.FC = () => {
  let content = null;

  const picturesArray: items[] = [
    { src: img1, name: "AJ Max Aura 4", price: 100 },
    { src: img2, name: "AJ 1 Mid SE Retro", price: 200 },
    { src: img3, name: "AJ 1 Mid SE", price: 300 },
    { src: img4, name: "Tatun 1 Home", price: 400 },
    { src: img5, name: "Jumpman MVP", price: 500 },
    { src: img6, name: "Zion 3 PF", price: 600 },
    { src: img7, name: "AJ 2 Low Origins", price: 700 },
    { src: img8, name: "Jumpman 2 trey", price: 800 },
    { src: img9, name: "AJ 1 Take 5", price: 900 },
    { src: img10, name: "AJ 1 Zoom cmft", price: 1000 },
    { src: img11, name: "Luka 2 bred PF", price: 1100 },
    { src: img12, name: "AJ 1 Highs", price: 1200 },
    { src: img13, name: "AJ Spikize Low", price: 1300 },
  ];

  const pictureCards = picturesArray.map((item, index) => (
    <div key={index} className="card-container">
      <div className="card">
        <div className="text-container">
          <text>{item.name}</text>
          <text>{item.price} $</text>
        </div>
        <img src={item.src} alt={`Card ${index + 1}`} />
        <div className="button-container">
          <button id="cart">Add to Cart</button>
          <button id="add">+</button>
          <text>0</text>
          <button id="add">-</button>
        </div>
      </div>
    </div>
  ));

  content = <div className="main-body">{pictureCards}</div>;
  return <>{content}</>;
};

export default Store;
