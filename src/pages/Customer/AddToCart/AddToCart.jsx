import React, { useState } from "react";
import { assets } from '../../../assets/assets';
import { IoIosArrowBack } from "react-icons/io";
import { TbBrandGoogleMaps } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { FiMinus } from "react-icons/fi";
import FinalizeOrder from "../../Customer/FinalizeOrder/FinalizeOrder";
import './AddToCart.css';

const AddToCart = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showOrder, setShowOrder] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('Main Branch, Bauan Batangas City');
  const [isDelivery, setIsDelivery] = useState(true);

  // State for item quantities
  const [quantities, setQuantities] = useState({
    ribs: 1,
    salmon: 1,
  });

  // State for add-ons
  const [addons, setAddons] = useState({
    extraRice: false,
    drinks: false,
    salad: false,
  });

  const handleClick = () => {
    console.log("Finalize Order button clicked");
    setShowOrder(true);
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectBranch = (branch) => {
    setSelectedBranch(branch);
    setIsDropdownOpen(false);
  };

  const toggleFunction = () => {
    setIsDelivery(!isDelivery);
    console.log(isDelivery ? "Switched to Dine In" : "Switched to Delivery");
  };

  // Function to handle quantity changes
  const changeQuantity = (item, change) => {
    setQuantities(prevQuantities => {
      const newQuantity = Math.max(prevQuantities[item] + change, 1); // Ensure quantity doesn't go below 1
      return { ...prevQuantities, [item]: newQuantity };
    });
  };

  // Function to handle add-ons selection
  const handleAddonChange = (addon) => {
    setAddons((prevAddons) => ({
      ...prevAddons,
      [addon]: !prevAddons[addon],
    }));
  };

  if (!isVisible) {
    return null;
  }


  return (
    <div className="addtocart">
      <div className="addtocart-container">
        <header className="addtocart-header">
          <i className="back-arrow" onClick={handleClose}>
            <IoIosArrowBack size={30} />
          </i>
          <h2>My Cart</h2>

          {/* Toggle Button */}
          <div className="toggle-container" onClick={toggleFunction}>
            <div className="toggle-text">
              <span>PreOrder</span>
              <span>PickUp</span>
            </div>
            <div className={`toggle-btn ${isDelivery ? 'delivery' : 'dine-in'}`}></div>
          </div>
        </header>

        <section className="addtocart-branch">
          <i className="location-icon"><TbBrandGoogleMaps size={31} /></i>
          <span>{selectedBranch}</span>
          <i className="down-icon" onClick={toggleDropdown}>
            {isDropdownOpen ? <IoIosArrowUp size={28} /> : <IoIosArrowDown size={28} />}
          </i>
        </section>

        {isDropdownOpen && (
          <div className="branch-dropdown">
            <p onClick={() => selectBranch('Main Branch, Bauan Batangas City')}>Main Branch, Bauan Batangas City</p>
            <p onClick={() => selectBranch('Branch 2: Batangas City')}>Branch 2: Batangas City</p>
          </div>
        )}

        <div className="addtocart-items">
          <div className="addtocart-item">
            <img src={assets.menu_1} alt="Babyback Ribs" className="addtocart-item-image" />
            <div className="addtocart-item-details">
              <p>Johanna's Babyback Ribs <br /><span>Large, P350</span></p>
              <div className="addtocart-item-quantity">
                <i className="quantity-btn" onClick={() => changeQuantity('ribs', -1)}><FiMinus /></i>
                <span className="quantity">{quantities.ribs}</span>
                <i className="quantity-btn" onClick={() => changeQuantity('ribs', 1)}><IoMdAdd /></i>
              </div>
            </div>
          </div>

          <div className="addtocart-item">
            <img src={assets.menu_3} alt="Grilled Salmon" className="addtocart-item-image" />
            <div className="addtocart-item-details">
              <p>Grilled Salmon Steak <br /><span>P395</span></p>
              <div className="addtocart-item-quantity">
                <i className="quantity-btn" onClick={() => changeQuantity('salmon', -1)}><FiMinus /></i>
                <span className="quantity">{quantities.salmon}</span>
                <i className="quantity-btn" onClick={() => changeQuantity('salmon', 1)}><IoMdAdd /></i>
              </div>
            </div>
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="cart-add-ons">
          <h3>Add-ons</h3>
          <div className="addon-option">
            <label>
              <input
                type="checkbox"
                checked={addons.extraRice}
                onChange={() => handleAddonChange('extraRice')}
              />
              Extra Rice (P20)
            </label>
          </div>
          <div className="addon-option">
            <label>
              <input
                type="checkbox"
                checked={addons.drinks}
                onChange={() => handleAddonChange('drinks')}
              />
              Drinks (P50)
            </label>
          </div>
          <div className="addon-option">
            <label>
              <input
                type="checkbox"
                checked={addons.salad}
                onChange={() => handleAddonChange('salad')}
              />
              Salad (P100)
            </label>
          </div>
        </div>

        <div className="addtocart-summary">
          {isDelivery && (
            <div className="summary-item">
              <p className="summary-label">Delivery Fee</p>
              <p className="summary-value">P50.00</p>
            </div>
          )}
          <div className="summary-item">
            <p className="summary-label">{isDelivery ? "Total" : "Total Amount"}</p>
            <p className="summary-value">
              P
              {isDelivery
                ? (350 * quantities.ribs + 395 * quantities.salmon + 50 +
                   (addons.extraRice ? 20 : 0) +
                   (addons.drinks ? 50 : 0) +
                   (addons.salad ? 100 : 0))
                : (350 * quantities.ribs + 395 * quantities.salmon +
                   (addons.extraRice ? 20 : 0) +
                   (addons.drinks ? 50 : 0) +
                   (addons.salad ? 100 : 0))
              }.00
            </p>
          </div>
        </div>

        <div className="bott">
          <button className="finalize-btn" onClick={handleClick}>FINALIZE ORDER</button>
          {showOrder && <FinalizeOrder />}
        </div>
      </div>
    </div>
  );
};

export default AddToCart;