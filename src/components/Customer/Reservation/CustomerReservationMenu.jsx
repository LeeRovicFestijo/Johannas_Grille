import React, { useState, useEffect } from 'react';
import CustomerReservationPayment from './CustomerReservationPayment';
import { IoIosCloseCircleOutline } from "react-icons/io";
import './CustomerReservationMenu.css';

const CustomerReservationMenu = ({ reservationDetails, onClose, reservationId }) => {
    const [menuItems, setMenuItems] = useState({});
    const [selectedItems, setSelectedItems] = useState({});
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    // Fetch menu items from the backend on component mount
    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch('https://johannas-grille.onrender.com/api/menu-items');
                const data = await response.json();

                // Organize data by menu category
                const organizedData = data.reduce((acc, item) => {
                    const category = `${item.menu_name} - P${item.package_price ? Number(item.package_price).toFixed(2) : 'N/A'}`;
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push({
                        id: item.menuitemid,
                        name: item.item_name,
                        image: item.image_url,
                        price: item.package_price
                    });
                    return acc;
                }, {});

                setMenuItems(organizedData);
                setSelectedItems(Object.keys(organizedData).reduce((acc, category) => {
                    acc[category] = {};
                    return acc;
                }, {}));
            } catch (error) {
                console.error('Error fetching menu items:', error);
            }
        };
        fetchMenuItems();
    }, []);

    // Handle item selection and quantity updates
    const handleItemSelection = (category, item, increment) => {
        setSelectedItems((prev) => {
            const menu = { ...prev[category] };
            const currentQty = menu[item.name]?.qty || 0;
            const newQty = Math.max(currentQty + increment, 0);

            if (newQty === 0) {
                delete menu[item.name];
            } else {
                menu[item.name] = { id: item.id, qty: newQty, price: item.price };
            }

            return { ...prev, [category]: menu };
        });
    };

    const handleConfirmSelection = () => {
        setIsConfirmOpen(true);
    };

    const handleFinalSubmit = async () => {
        // Prepare the data to be sent to the backend
        const itemsToSend = [];

        // Loop through the selectedItems and extract item details (id, qty)
        let totalAmount = 0; // Variable to store the total amount

        Object.keys(selectedItems).forEach((category) => {
            Object.values(selectedItems[category]).forEach(({ id, qty }) => {
                if (qty > 0) { // Only send items that have a quantity greater than 0
                    itemsToSend.push({ reservationId, itemId: id, qty });

                    // Calculate the total amount for this item
                    const item = menuItems[category].find(item => item.id === id);
                    if (item) {
                        totalAmount += item.price * qty;
                    }
                }
            });
        });

        // Include reservationId and totalAmount in reservationDetails
        const updatedReservationDetails = {
            ...reservationDetails,
            reservationId,
            totalAmount,
        };

        try {
            const response = await fetch('https://johannas-grille.onrender.com/api/reservations/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ reservationDetails: updatedReservationDetails, items: itemsToSend }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('Reservation items submitted:', data);

            setIsPaymentOpen(true);

        } catch (error) {
            console.error('Error submitting reservation items:', error);
        }
    };



    const ConfirmPopup = ({ selectedItems, onConfirm, onCancel }) => {
        const totalAmount = Object.values(selectedItems).reduce((total, menu) => {
            return total + Object.values(menu).reduce((menuTotal, { qty, price }) => {
                return menuTotal + qty * price;
            }, 0);
        }, 0);

        return (
            <div className="confirm-popup-overlay">
                <div className="confirm-popup-content">
                    <h2>Confirm Your Selection</h2>
                    {Object.entries(selectedItems).map(([category, items]) => (
                        <div key={category}>
                            <ul>
                                {Object.entries(items).map(([item, { qty }]) => (
                                    <li key={item}>
                                        {item}: {qty}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    <h3>Total Amount: P{totalAmount.toFixed(2)}</h3>
                    <div className="popup-buttons">
                        <button className="confirm" onClick={onConfirm}>Confirm</button>
                        <button className="cancel" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="cust-res-menu-popup">
            <div className="cust-res-menu-popup-content">
                <button className="cust-res-menu-popup-close" onClick={onClose}><IoIosCloseCircleOutline size={33}/></button>
                <h2>Select Your Package</h2>

                {Object.keys(menuItems).map((category) => (
                    <div key={category} className="cust-res-menu-grid-container">
                        <h3>{category}</h3>
                        <div className="cust-res-menu-grid">
                            {menuItems[category].map((item) => (
                                <div key={item.id} className="cust-res-menu-item">
                                    <img src={item.image} alt={item.name} className="cust-res-menu-item-image" />
                                    <div className="cust-res-menu-item-details">
                                        <h3>{item.name}</h3>
                                        <div className="cust-res-menu-quantity">
                                            <button className="cust-res-menu-quantity-button" onClick={() => handleItemSelection(category, item, -1)}>-</button>
                                            <span>{selectedItems[category][item.name]?.qty || 0}</span>
                                            <button className="cust-res-menu-quantity-button" onClick={() => handleItemSelection(category, item, 1)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                <button onClick={handleConfirmSelection} className="confirm-menu">
                    Confirm Selection
                </button>

                {isConfirmOpen && (
                    <ConfirmPopup
                        selectedItems={selectedItems}
                        onConfirm={handleFinalSubmit}
                        onCancel={() => setIsConfirmOpen(false)}
                    />
                )}

                {isPaymentOpen && (
                    <CustomerReservationPayment
                        reservationDetails={reservationDetails}
                        selectedItems={selectedItems}
                        reservationId={reservationId}
                        onConfirm={() => setIsPaymentOpen(false)}
                        onPaymentComplete={() => onClose()}
                        onClose={onClose}
                    />
                )}
            </div>
        </div>
    );
};

export default CustomerReservationMenu;