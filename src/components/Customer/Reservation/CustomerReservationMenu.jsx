import React, { useState } from 'react';
import CustomerReservationPayment from './CustomerReservationPayment'
import './CustomerReservationMenu.css'

const CustomerReservationMenu = ({ onClose }) => {
    const menuItems = {
        'Menu A': [
            {
                name: 'Babyback Ribs',
                image: '/src/assets/01.jpg',
                details: 'Babyback Ribs slices',
                price: "P 500.00",
            },
            {
                name: 'Pizza Combo',
                image: '/src/assets/02.jpg',
                details: 'Includes pizza, fries, soda, and ice cream',
                price: "P 600.00",
            },
        ],
        'Menu B': [
            {
                name: 'Burger Combo',
                image: '/src/assets/03.jpg',
                details: 'Includes burger, fries, salad, and a drink',
                price: "P 700.00",
            },
            {
                name: 'Steak Meal',
                image: '/src/assets/04.jpg',
                details: 'Includes steak, mashed potatoes, and a drink',
                price: "P 800.00",
            },
        ],
        'Menu C': [
            {
                name: 'Burger Combo',
                image: '/src/assets/03.jpg',
                details: 'Includes burger, fries, salad, and a drink',
                price: "P 700.00",
            },
            {
                name: 'Steak Meal',
                image: '/src/assets/04.jpg',
                details: 'Includes steak, mashed potatoes, and a drink',
                price: "P 800.00",
            },
        ],
        'Menu D': [
            {
                name: 'Burger Combo',
                image: '/src/assets/03.jpg',
                details: 'Includes burger, fries, salad, and a drink',
                price: "P 700.00",
            },
            {
                name: 'Steak Meal',
                image: '/src/assets/04.jpg',
                details: 'Includes steak, mashed potatoes, and a drink',
                price: "P 800.00",
            },
        ],
    };

    const [selectedItems, setSelectedItems] = useState({});
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleItemSelection = (name, increment) => {
        setSelectedItems((prev) => {
            const currentQty = prev[name] || 0;
            const newQty = Math.max(currentQty + increment, 0); // Prevent negative quantity
            return { ...prev, [name]: newQty };
        });
    };

    const handleConfirmSelection = () => {
        setIsConfirmOpen(true); // Open the confirmation popup
    };

    const handleFinalSubmit = () => {
        console.log("Selected Items:", selectedItems);
        onClose(); // Close the form after confirmation
    };

    return (
        <div className="res-popup">
            <div className="res-popup-content">
                <button className="res-popup-close" onClick={onClose}>Close</button>
                <h2>Select Your Package</h2>

                {/* Iterate over the categories */}
                {Object.keys(menuItems).map((category) => (
                    <div key={category}>
                        <h3>{category}</h3>
                        <div className="res-grid">
                            {menuItems[category].map((item, index) => (
                                <div key={index} className="res-item">
                                    <img src={item.image} alt={item.name} className="res-item-image" />
                                    <div className="res-item-details">
                                        <h3>{item.name}</h3>
                                        <p>{item.details}</p>
                                        <div className="res-price-container">
                                            <span className="res-price">{item.price}</span>
                                        </div>
                                        <div className="res-quantity">
                                            <button
                                                className="res-quantity-button"
                                                onClick={() => handleItemSelection(item.name, -1)}
                                            >-</button>
                                            <span>{selectedItems[item.name] || 0}</span>
                                            <button
                                                className="res-quantity-button"
                                                onClick={() => handleItemSelection(item.name, 1)}
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button onClick={handleConfirmSelection} className="res-confirm-menu">
                    Confirm Selection
                </button>

                {isConfirmOpen && (
                    <CustomerReservationPayment
                        selectedItems={selectedItems}
                        onConfirm={handleFinalSubmit}
                        onCancel={() => setIsConfirmOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}

export default CustomerReservationMenu
