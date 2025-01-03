import React, { useState, useEffect } from "react";
import CustomerReservationPayment from "../CustomerReservationPayment/CustomerReservationPayment";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./CustomerReservationMenu.css";
import { useProvider } from "../../../../global_variable/provider";

const CustomerReservationMenu = ({ reservationDetails, onClose, reservationId }) => {
    const { reserveItems, setReserveItems, customer } = useProvider();
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
                    if (!acc[category]) acc[category] = { Main: [], Sides: {}, package_price: item.package_price };
                
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
            let totalAmount = 0;
    
            Object.keys(selectedCategories).forEach((category) => {
                if (selectedCategories[category]) {
                    const { Main, Sides } = menuItems[category];
    
                    // Add all main dishes
                    Main.forEach((item) => {
                        payload.push({
                            reservationId,
                            customerid: customer.customerid, // assuming reservationDetails has customerId
                            numberOfGuests: reservationDetails.numberofguests, // assuming number of guests is in reservationDetails
                            reservationDate: reservationDetails.reservationdate, // assuming date is in reservationDetails
                            reservationTime: reservationDetails.reservationtime, // assuming time is in reservationDetails
                            branch: reservationDetails.branch, // assuming branch is in reservationDetails
                            amount: item.package_price, // Start with package price of main dishes
                            modeOfPayment: "GCash",
                            status: "Pending", // default status (could be updated later)
                            menuItemId: item.menuitemid,
                            quantity: 1,
                        });
                        totalAmount += item.package_price;
                    });
    
                    // Add selected side dishes
                    Object.values(selectedSideDishes[category] || {}).forEach((item) => {
                        if (item) {
                            payload.push({
                                reservationId,
                                customerid: customer.customerid,
                                numberOfGuests: reservationDetails.numberofguests,
                                reservationDate: reservationDetails.reservationdate,
                                reservationTime: reservationDetails.reservationtime,
                                branch: reservationDetails.branch,
                                amount: item.package_price, // Add package price of side dishes
                                modeOfPayment: "GCash",
                                status: "pending",
                                menuItemId: item.menuitemid,
                                quantity: 1,
                            });
                            totalAmount += item.package_price;
                        }
                    });
                }
            });
    
            // Add total amount to the payload if needed, or you can process it separately.
            // payload.push({
            //     reservationId,
            //     customerid: customer.customerid,
            //     totalAmount, // Sum of all selected items
            //     modeOfPayment: "GCash",
            //     status: "pending",
            // });

            console.log(payload);
    
            // Send the data to the API
            await fetch("http://localhost:3000/api/reservations/items", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
    
            // Add the items to the reserveItems state in the provider
            setReserveItems(prev => [
                ...prev,
                ...payload.filter(item => item.menuItemId) // Only add items with a menuItemId
            ]);
    
            setIsPaymentOpen(true);
        } catch (error) {
            console.error("Error submitting reservation:", error);
        }
    };

    // Check if any category has been selected
    const isAnyCategorySelected = Object.values(selectedCategories).includes(true);

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
                                <h3>{category} - {menuItems[category].package_price}</h3>
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
                <button 
                    onClick={handleFinalSubmit} 
                    disabled={!isAnyCategorySelected}
                >
                    Confirm Selection
                </button>
                {isPaymentOpen && <CustomerReservationPayment reservationId={reservationId} onClose={onClose} />}
            </div>
        </div>
    );
};

export default CustomerReservationMenu;
