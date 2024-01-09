import React, { useEffect, useState } from "react";
import "./store.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItem, removeItem, updateQuantity } from "../redux/cartSlice";
import axios from "axios";

interface items {
  src: string;
  name: string;
  price: number;
}
const Store: React.FC = () => {
  const [itemCounts, setItemCounts] = useState<number[]>(new Array(13).fill(0));
  const [allItems, setAllItems] = useState([]);
  const history = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllItems = async () => {
      try {
        const { data } = await axios.post("/api/items/getAllShoes");
        setAllItems(data);
      } catch (error) {
        throw new Error("No Item Found");
      }
    };
    getAllItems();
    return () => {};
  }, []);

  const handleAddToCart = (
    index: number,
    nameOfItem: string,
    priceOfItems: number,
    pictureofItem: string
  ) => {
    const updatedCounts = [...itemCounts];
    updatedCounts[index]++;
    setItemCounts(updatedCounts);

    const cartButtonUpdate = document.getElementById(`cart-${index}`);
    if (cartButtonUpdate) {
      cartButtonUpdate.textContent = "Go to Cart";
      cartButtonUpdate.onclick = () => history("/addtocart");
    }

    dispatch(
      addItem({
        itemId: index.toString(),
        itemName: nameOfItem,
        itemPrice: priceOfItems.toString(),
        itemQuantity: updatedCounts[index].toString(),
        itemPicture: pictureofItem,
      })
    );
  };

  const handleRemoveFromCart = (
    index: number,
    nameOfItem: string,
    priceOfItems: number
  ) => {
    const updatedCounts = [...itemCounts];
    if (updatedCounts[index] > 0) {
      updatedCounts[index]--;
    }
    setItemCounts(updatedCounts);

    const cartButtonUpdate = document.getElementById(`cart-${index}`);
    if (cartButtonUpdate && updatedCounts[index] === 0) {
      cartButtonUpdate.textContent = "Add to Cart";
      cartButtonUpdate.onclick = () => null;
      dispatch(removeItem({ itemId: index.toString() }));
    }

    dispatch(
      updateQuantity({
        itemId: index.toString(),
        itemQuantity: updatedCounts[index].toString(),
      })
    );
  };
  let content = null;
  const pictureCards = allItems ? (
    allItems.map((item: items, index) => (
      <div key={index} className="card-container">
        <div className="card">
          <div className="text-container">
            <p>{item.name}</p>
            <p>{item.price} $</p>
          </div>
          <img src={item.src} alt={`Card ${index + 1}`} />
          <div className="button-container">
            <button
              id={`cart-${index}`}
              onClick={() =>
                handleAddToCart(index, item.name, item.price, item.src)
              }
            >
              Add to Cart
            </button>
            <button
              id={`add-${index}`}
              onClick={() =>
                handleAddToCart(index, item.name, item.price, item.src)
              }
            >
              +
            </button>
            <p id={`countOfItems-${index}`}>{itemCounts[index]}</p>
            <button
              id={`remove-${index}`}
              onClick={() => handleRemoveFromCart(index, item.name, item.price)}
            >
              -
            </button>
          </div>
        </div>
      </div>
    ))
  ) : (
    <></>
  );

  content = <div className="main-body">{pictureCards}</div>;
  return <>{content}</>;
};

export default Store;
