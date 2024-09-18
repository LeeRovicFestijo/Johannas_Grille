import React, { useState } from 'react';
import './Cart.css';
import { food_list } from '../../../assets/assets';
import { IoIosCloseCircle } from "react-icons/io";
import { MdAddCircleOutline } from "react-icons/md";
import { LuMinusCircle } from "react-icons/lu";

function Cart ({ id, name }) {
  const [isVisible, setIsVisible] = useState(true);

  const foodItem = food_list.find(item => item.name === name);
  const description = foodItem ? foodItem.description : '';
  const image = foodItem ? foodItem.image : '';
  let price = foodItem ? foodItem.price : 0;
  let price_1 = foodItem ? foodItem.price_1 : 0;
  let price_2 = foodItem ? foodItem.price_2 : 0;
  let double = foodItem ? foodItem.double : 0;
  let trio = foodItem ? foodItem.trio : 0;
  let plain_salad = foodItem ? foodItem.plain_salad : 0;
  let tuna_flakes = foodItem ? foodItem.tuna_flakes : 0;

  const handleClose = () => {
    setIsVisible(false);  // Hide the cart
  };

  if (!isVisible) {
    return null; // Don't render the cart if it's not visible
  }

  return (
    <div className="cart-container">
      <div className="cart-container-content">
        <div className="close">
          <button className="close-button" onClick={handleClose}>
            <IoIosCloseCircle size={25}/>
          </button>
        </div>

        <div className="item-name">
          <img className="cart-item-image" src={image} alt="" />
          <h3>{name}</h3>
        </div>
        <hr/>
        <div className="size-options">
          {foodItem.price && (
            <div className="size-option">
              <input type="radio" name="size" id="small" />
              <label htmlFor="small">Regular Size</label>
              <span className="price">P {price}.00</span>
            </div>
          )}
          {foodItem.price_1 && (
            <div className="size-option">
              <input type="radio" name="size" id="medium" />
              <label htmlFor="medium">Medium Size</label>
              <span className="price">P {price_1}.00</span>
            </div>
          )}
          {foodItem.price_2 && (
            <div className="size-option">
              <input type="radio" name="size" id="large" />
              <label htmlFor="large">Large Size</label>
              <span className="price">P {price_2}.00</span>
            </div>
          )}
          {foodItem.double && (
            <div className="size-option">
              <input type="radio" name="size" id="double" />
              <label htmlFor="double">Double</label>
              <span className="price">P {double}.00</span>
            </div>
          )}
          {foodItem.trio && (
            <div className="size-option">
              <input type="radio" name="size" id="trio" />
              <label htmlFor="trio">Trio</label>
              <span className="price">P {trio}.00</span>
            </div>
          )}
          {foodItem.plain_salad && (
            <div className="size-option">
              <input type="radio" name="size" id="plain" />
              <label htmlFor="plain">Plain</label>
              <span className="price">P {plain_salad}.00</span>
            </div>
          )}
          {foodItem.tuna_flakes && (
            <div className="size-option">
              <input type="radio" name="size" id="tuna-flakes" />
              <label htmlFor="tuna-flakes">W/ Tuna Flakes</label>
              <span className="price">P {tuna_flakes}.00</span>
            </div>
          )}
          <hr />
        </div>

        <div className="quantity-control">
          <div className="quantity-button">
            <i className="decrement"><LuMinusCircle size={25}/></i>
            <span className="quantity">1</span>
            <i className="increment"><MdAddCircleOutline size={25}/></i>
          </div>
          <button className="add-to-cart">ADD TO CART</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
