import React, { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { TbBrandGoogleMaps } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import ProductPayment from "../ProductPayment/ProductPayment";
import "./ProductCart.css";
import ProductItem from "../../Cart/ProductItem/ProductItem";

const ProductCart = ({ orderId }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showOrder, setShowOrder] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState(
    "Main Branch, Bauan Batangas City"
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPickUp, setIsPickUp] = useState(true);
  const [pickupDate, setPickupDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [pickupHour, setPickupHour] = useState("12:00");

  // Fetch order items
  useEffect(() => {
    const fetchOrderItems = async () => {
      if (!orderId) return;
      try {
        const response = await fetch(`http://localhost:3000/api/order/${orderId}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setOrderItems(data.map(item => ({ ...item, quantity: item.quantity || 1 }))); // Default quantity to 1
      } catch (error) {
        console.error("Error fetching order items:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItems();
  }, [orderId]);

  // Update quantity handler
  const updateQuantity = (id, change) => {
    setOrderItems(prevItems =>
      prevItems.map(item =>
        item.orderitemid === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  // Dropdown toggle
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Select branch
  const selectBranch = branch => {
    setSelectedBranch(branch);
    setIsDropdownOpen(false);
  };

  // Toggle pick-up or preorder
  const toggleFunction = () => setIsPickUp(!isPickUp);

  if (!isVisible) return null;

  return (
    <div className="addtocart">
      <div className="addtocart-container">
        <header className="addtocart-header">
          <i className="back-arrow" onClick={() => setIsVisible(false)}>
            <IoIosArrowBack size={30} />
          </i>
          <h2>My Cart</h2>
          <div className="toggle-container" onClick={toggleFunction}>
            <div className="toggle-text">
              <span>PickUp</span>
              <span>PreOrder</span>
            </div>
            <div
              className={`toggle-btn ${isPickUp ? "pickup" : "preorder"}`}
            ></div>
          </div>
        </header>

        <section className="addtocart-branch">
          <i className="location-icon">
            <TbBrandGoogleMaps size={31} />
          </i>
          <span>{selectedBranch}</span>
          <i className="down-icon" onClick={toggleDropdown}>
            {isDropdownOpen ? <IoIosArrowUp size={28} /> : <IoIosArrowDown size={28} />}
          </i>
        </section>
        <h3>Order ID: {orderId}</h3>

        {isDropdownOpen && (
          <div className="branch-dropdown">
            <p onClick={() => selectBranch("Main Branch, Bauan Batangas City")}>
              Main Branch, Bauan Batangas City
            </p>
            <p onClick={() => selectBranch("Branch 2: Batangas City")}>
              Branch 2: Batangas City
            </p>
          </div>
        )}

        <div>
          {orderItems.length > 0 ? (
            orderItems.map(item => (
              <ProductItem
                key={item.orderitemid}
                item={item}
                increaseQuantity={() => updateQuantity(item.orderitemid, 1)}
                decreaseQuantity={() => updateQuantity(item.orderitemid, -1)}
              />
            ))
          ) : (
            <div>No items in your order.</div>
          )}
        </div>

        <div className="addtocart-summary">
          {isPickUp && (
            <div className="pickup-time">
              <label htmlFor="pickupDate">Pick-up Date:</label>
              <input
                type="date"
                id="pickupDate"
                value={pickupDate}
                onChange={e => setPickupDate(e.target.value)}
              />
              <label htmlFor="pickupHour">Pick-up Time:</label>
              <select
                id="pickupHour"
                value={pickupHour}
                onChange={e => setPickupHour(e.target.value)}
              >
                <option value="12:00">12:00 PM</option>
                <option value="12:30">12:30 PM</option>
                <option value="1:00">1:00 PM</option>
                <option value="1:30">1:30 PM</option>
              </select>
            </div>
          )}

          <div className="summary-item">
            <p className="summary-label">Total</p>
            <p className="summary-value">
              P
              {orderItems
                .reduce((acc, item) => acc + (parseFloat(item.price) || 0) * item.quantity, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>

        <div className="bott">
          <button className="finalize-btn" onClick={() => setShowOrder(true)}>
            FINALIZE ORDER
          </button>
        </div>
      </div>

      {showOrder && (
        <ProductPayment
          selectedBranch={selectedBranch}
          orderItems={orderItems}
          pickupDate={pickupDate}
          pickupHour={pickupHour}
          isPickUp={isPickUp}
          onClose={() => setShowOrder(false)}
        />
      )}
    </div>
  );
};

export default ProductCart;
