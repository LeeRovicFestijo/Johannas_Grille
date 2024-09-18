import React, { useState } from 'react'
import './Home.css'
import Header from '../../../components/Customer/Header/Header'
import ExploreMenu from '../../../components/Customer/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../../components/Customer/FoodDisplay/FoodDisplay'
import Navbar from '../../../components/Customer/Navbar/Navbar'
import Footer from '../../../components/Customer/Footer/Footer'

const Home = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showAddToCart, setShowAddToCart] = useState(false)
    const [category,setCategory] = useState("All");

  return (
    <div>
    <Navbar setShowLogin={setShowLogin} />
      {showLogin && <LoginPopUp setShowLogin={setShowLogin} />}
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisplay category={category}/>
      <Footer/>
    </div>
  )
}

export default Home
