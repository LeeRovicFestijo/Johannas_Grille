import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReservationMenu.css'


const ReservationMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch data from backend
    axios.get('http://localhost:3000/api/reservations')
      .then((response) => {
        setMenuItems(response.data); // Set state with the fetched data
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching data');
        setLoading(false);
        console.error(err);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="admin-res-menu-container">
      <h1>Reservation Menu</h1>
      <div className="admin-res-menu-grid">
        {menuItems.map((item) => (
          <div className="admin-res-menu-card" key={item.id}>
            <img src={item.imageUrl} alt={item.name} className="admin-res-menu-image" />
            <div className="admin-res-menu-info">
              <h2>{item.name}</h2>
              <p>{item.description}</p>
            </div>
            <div className="admin-res-menu-actions">
              <button className="admin-res-edit-btn">✏️</button>
              <button className="admin-res-delete-btn">🗑️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationMenu;