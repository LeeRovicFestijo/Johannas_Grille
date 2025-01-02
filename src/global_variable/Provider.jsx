import { createContext, useContext, useState } from 'react';
import usePersistState from '../hook/usePersistState'; 

const Context = createContext();

export function Provider({ children }) {
  const [orderItems, setOrderItems] = usePersistState('cart', []);
  const [foodList, setFoodList] = useState([]);
  const [tableNumber, setTableNumber] = usePersistState('table', '');
  const [orderType, setOrderType] = usePersistState('order', 'Dine In');

  return (
    <Context.Provider value={{ orderItems, setOrderItems, foodList, setFoodList, tableNumber, setTableNumber, orderType, setOrderType }}>
      {children}
    </Context.Provider>
  );
}

export function useProvider() {
  return useContext(Context);
}