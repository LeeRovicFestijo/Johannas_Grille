// import { AreaCards, AreaCharts, AreaTable, AreaTop } from "../../../components";
import React, { useState } from 'react'
import ItemDisplay from "../../../components/Admin/ItemDisplay/ItemDisplay";
import Menu from "../../../components/Admin/Menu/Menu";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import './Product.css'

const Product = () => {
    const [category,setCategory] = useState("All");

    return (
        <main >
            {/* left of page */}
            <Sidebar />
            {/* right side/content of the page */}
            <div className="content-wrapper">
                <Menu category={category} setCategory={setCategory} />
                <ItemDisplay category={category} />
                {/* <AreaCharts />
        <AreaTable /> */}
            </div>
        </main>
    );
};

export default Product;
