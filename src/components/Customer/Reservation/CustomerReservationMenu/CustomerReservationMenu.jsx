import React, { useState, useEffect } from "react";
import CustomerReservationPayment from "../CustomerReservationPayment/CustomerReservationPayment";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./CustomerReservationMenu.css";

const CustomerReservationMenu = ({ reservationDetails, onClose, reservationId }) => {
    const [menuItems, setMenuItems] = useState({});
    const [selectedItems, setSelectedItems] = useState({});
    const [isPaymentOpen, setIsPaymentOpen] = useState(false);

    // Fetch and organize menu data
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
                setSelectedItems(
                    Object.keys(organizedData).reduce((acc, category) => {
                        acc[category] = { Main: [], Sides: {} };
                        return acc;
                    }, {})
                );
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        };
        fetchMenuItems();
    }, []);

    // Handle selections
    const handleSelection = (category, type, item) => {
        setSelectedItems((prev) => {
            const updated = { ...prev };
            if (type === "Main") {
                // Allow multiple main dishes (checkbox logic)
                updated[category].Main = updated[category].Main.some((i) => i.id === item.id)
                    ? updated[category].Main.filter((i) => i.id !== item.id)
                    : [...updated[category].Main, item];
            } else {
                // Allow only one side dish per side category (radio logic)
                updated[category].Sides[type] = updated[category].Sides[type]?.id === item.id ? null : item;
            }
            return updated;
        });
    };

    // Validate selections
    const validateSelection = () => {
        for (const category in selectedItems) {
            const { Main, Sides } = selectedItems[category];
            if (Main.length === 0) {
                alert(`Please select at least one Main Dish for ${category}`);
                return false;
            }
            const allSides = Object.values(Sides).filter((side) => side);
            if (allSides.length === 0) {
                alert(`Please select one Side Dish per category for ${category}`);
                return false;
            }
        }
        return true;
    };

    const handleFinalSubmit = async () => {
        if (!validateSelection()) return;

        try {
            const payload = [];
            Object.keys(selectedItems).forEach((category) => {
                const { Main, Sides } = selectedItems[category];
                Main.forEach((item) => payload.push({ reservationId, itemId: item.menuitemid, qty: 1 }));
                Object.values(Sides).forEach((item) => {
                    if (item) payload.push({ reservationId, itemId: item.menuitemid, qty: 1 });
                });
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
                            <h3>{category}</h3>

                            {/* Main Dish Selection */}
                            <div>
                                <h4>Main Dishes</h4>
                                {menuItems[category].Main.map((item) => (
                                    <div key={item.menuitemid} className="menu-item">
                                        <label>
                                            <input
                                                type="checkbox"
                                                checked={selectedItems[category].Main.some(
                                                    (i) => i.id === item.menuitemid
                                                )}
                                                onChange={() => handleSelection(category, "Main", item)}
                                            />
                                            {item.item_name} - P{item.package_price}
                                        </label>
                                    </div>
                                ))}
                            </div>

                            {/* Side Dishes Selection */}
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
                                                        selectedItems[category].Sides[sideCategory]?.id ===
                                                        item.menuitemid
                                                    }
                                                    onChange={() =>
                                                        handleSelection(category, sideCategory, item)
                                                    }
                                                />
                                                {item.item_name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            ))}
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
