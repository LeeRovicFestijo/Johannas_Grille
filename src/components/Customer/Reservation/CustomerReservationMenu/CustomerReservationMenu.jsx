import React, { useState, useEffect } from "react";
import CustomerReservationPayment from "../CustomerReservationPayment/CustomerReservationPayment";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./CustomerReservationMenu.css";

const CustomerReservationMenu = ({ reservationDetails, onClose, reservationId }) => {
    const [menuItems, setMenuItems] = useState({});
    const [selectedCategories, setSelectedCategories] = useState({});
    const [selectedSideDishes, setSelectedSideDishes] = useState({});
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await fetch("http://localhost:3000/api/menu-items");
                const data = await response.json();

                const organizedData = data.reduce((acc, item) => {
                    const category = item.menu_name;
                    if (!acc[category]) acc[category] = { Main: [], Sides: {} };

                    if (item.side_dish.includes("Main")) {
                        acc[category].Main.push(item);
                    } else {
                        const sideCategory = item.side_dish || "Other Sides";
                        if (!acc[category].Sides[sideCategory]) acc[category].Sides[sideCategory] = [];
                        acc[category].Sides[sideCategory].push(item);
                    }
                    return acc;
                }, {});

                setMenuItems(organizedData);

                // Initialize selection states
                const initialSelectedCategories = Object.keys(organizedData).reduce((acc, category) => {
                    acc[category] = false;
                    return acc;
                }, {});

                const initialSelectedSideDishes = Object.keys(organizedData).reduce((acc, category) => {
                    acc[category] = {};
                    return acc;
                }, {});

                setSelectedCategories(initialSelectedCategories);
                setSelectedSideDishes(initialSelectedSideDishes);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };

        fetchMenuItems();
    }, []);

    const handleCategorySelection = (category) => {
        setSelectedCategories((prev) => ({
            ...prev,
            [category]: !prev[category],
        }));
    };

    const handleSideDishSelection = (category, sideCategory, item) => {
        setSelectedSideDishes((prev) => ({
            ...prev,
            [category]: {
                ...prev[category],
                [sideCategory]: 
                    prev[category]?.[sideCategory]?.menuitemid === item.menuitemid 
                        ? null 
                        : item,
            },
        }));
    };

    const validateSelection = () => {
        for (const category in selectedCategories) {
            if (selectedCategories[category]) {
                const sideDishes = selectedSideDishes[category];
                const allSideCategories = menuItems[category]?.Sides || {};
                const selectedSides = Object.keys(allSideCategories).every(
                    (sideCategory) => sideDishes[sideCategory]
                );
                if (!selectedSides) {
                    alert(`Please select one side dish for each side category in ${category}.`);
                    return false;
                }
            }
        }
        return true;
    };

    const handleFinalSubmit = async () => {
        if (!validateSelection()) return;

        try {
            const payload = [];
            Object.keys(selectedCategories).forEach((category) => {
                if (selectedCategories[category]) {
                    const { Main, Sides } = menuItems[category];

                    // Add all main dishes
                    Main.forEach((item) => {
                        payload.push({ reservationId, itemId: item.menuitemid, qty: 1 });
                    });

                    // Add selected side dishes
                    Object.values(selectedSideDishes[category] || {}).forEach((item) => {
                        if (item) payload.push({ reservationId, itemId: item.menuitemid, qty: 1 });
                    });
                }
            });

            await fetch("http://localhost:3000/api/reservations/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            setIsPaymentOpen(true);
        } catch (error) {
            console.error("Error submitting reservation:", error);
        }
    };

    return (
        <div className="cust-res-menu-popup">
            <div className="cust-res-menu-popup-content">
                <button className="cust-res-menu-popup-close" onClick={onClose}>
                    <IoIosCloseCircleOutline size={33} />
                </button>
                <h2>Choose Your Package</h2>
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                    {Object.keys(menuItems).map((category) => (
                        <div key={category} className="menu-category">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={selectedCategories[category]}
                                    onChange={() => handleCategorySelection(category)}
                                />
                                <h3>{category}</h3>
                            </label>

                            {selectedCategories[category] && (
                                <>
                                    {/* Main Dishes */}
                                    <div>
                                        <h4>Main Dishes</h4>
                                        {menuItems[category].Main.map((item) => (
                                            <div key={item.menuitemid} className="menu-item">
                                                {item.item_name}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Side Dishes */}
                                    {Object.keys(menuItems[category].Sides).map((sideCategory) => (
                                        <div key={sideCategory}>
                                            <h4>{sideCategory}</h4>
                                            {menuItems[category].Sides[sideCategory].map((item) => (
                                                <div key={item.menuitemid} className="menu-item">
                                                    <label>
                                                    <input
                                                        type="radio"
                                                        name={`side-${category}-${sideCategory}`}
                                                        checked={
                                                            selectedSideDishes[category]?.[sideCategory]?.menuitemid === item.menuitemid
                                                        }
                                                        onChange={() =>
                                                            handleSideDishSelection(category, sideCategory, item)
                                                        }
                                                    />
                                                        {item.item_name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <button onClick={handleFinalSubmit}>Confirm Selection</button>
                {isPaymentOpen && <CustomerReservationPayment reservationId={reservationId} onClose={onClose} />}
            </div>
        </div>
    );
};

export default CustomerReservationMenu;
