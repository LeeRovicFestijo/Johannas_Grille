import React, { useState } from "react";
import "./MenuVariant.css";

const MenuVariant = ({ variants, isOpen, onClose, orderId, itemId, price }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  if (!isOpen) return null; // Ensure the component is not rendered when closed

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const handleAddToOrder = async () => {
    if (!selectedVariant) {
      setPopupMessage("Please select a variant before adding to the order.");
      return;
    }

    setLoading(true);

    // Construct the request body with the selected variant's unique ID
    const requestBody = {
      orderid: orderId,  // Pass the correct orderId
      menuitemid: selectedVariant.id,  // Pass the unique variant ID
      variant: selectedVariant.variant, // Pass the selected variant (e.g., 'large' or 'medium')
      quantity: 1,
      price: price,
    };

    console.log("Adding item to order with request body:", requestBody);

    try {
      const response = await fetch("http://localhost:3000/api/orderitems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setPopupMessage("Item successfully added to your order!");
        onClose(); // Close the popup after adding the item
      } else {
        throw new Error("Failed to add item to order.");
      }
    } catch (error) {
      setPopupMessage("Failed to add item to your order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="employee-menu-variant-popup">
      <div className="employee-menu-variant-container">
        <button className="employee-menu-variant-close-button" onClick={onClose}>
          &times;
        </button>
        <h2 className="employee-menu-variant-popup-title">Menu Variant</h2>
        <div className="employee-menu-variant-popup-options">
          {variants.map((variant, index) => (
            <button
              key={index}
              className={`employee-menu-variant-option-button ${
                selectedVariant && selectedVariant.id === variant.id ? "selected" : ""
              }`}
              onClick={() => handleVariantChange(variant)}
            >
              {variant.variant}
            </button>
          ))}
        </div>
        {popupMessage && <p className="employee-menu-variant-popup-message">{popupMessage}</p>}
        <button
          className="employee-menu-variant-select-button"
          onClick={handleAddToOrder}
          disabled={!selectedVariant || loading}
        >
          {loading ? "Adding..." : "Add to Order"}
        </button>
      </div>
    </div>
  );
};

export default MenuVariant;
