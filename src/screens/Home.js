import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'

export default function Home() {const [foodCat, setFoodCat] = useState([]);
   const [foodItems, setFoodItems] = useState([]);
   const [search, setSearch] = useState('');
    const loadData = async () => {
       try {
           let response = await fetch("http://localhost:4000/api/foodData", {
               method: "GET",
               headers: {
                   'Content-Type': 'application/json'
               }
           });
            response = await response.json();
            console.log("Response data:", response);
            
            if (response[0] && response[1]) {
                setFoodItems(response[0]);
                setFoodCat(response[1]);
            } else {
                console.error("Invalid data format received:", response);
            }
       } catch (error) {
           console.error("Error loading data:", error);
       }
   }
    useEffect(() => {
       loadData();
   }, []);
    return (
       <div>
           <div>
               <Navbar />
           </div>
           <div>
               <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                   <div className="carousel-inner" id='carousel'>
                       <div className="carousel-caption" style={{ zIndex: "10" }}>
                           <div className="d-flex justify-content-center">
                               <input 
                                   className="form-control me-2 w-75 bg-white text-dark" 
                                   type="search" 
                                   placeholder="Search..." 
                                   aria-label="Search"
                                   value={search}
                                   onChange={(e) => setSearch(e.target.value)} 
                               />
                               <button className="btn text-white bg-danger" onClick={() => setSearch('')}>X</button>
                           </div>
                       </div>
                       <div className="carousel-item active">
                           <img src="./ferfr.jpg" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover", height: "500px" }} alt="..." />
                       </div>
                       <div className="carousel-item">
                           <img src="./ferfr.jpg" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover", height: "500px" }} alt="..." />
                       </div>
                       <div className="carousel-item">
                           <img src="./ferfr.jpg" className="d-block w-100" style={{ filter: "brightness(30%)", objectFit: "cover", height: "500px" }} alt="..." />
                       </div>
                   </div>
                   <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                       <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                       <span className="visually-hidden">Previous</span>
                   </button>
                   <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                       <span className="carousel-control-next-icon" aria-hidden="true"></span>
                       <span className="visually-hidden">Next</span>
                   </button>
               </div>
           </div>
           <div className='container'>
               {foodCat.length > 0 ? (
                   foodCat.map((data) => {
                       return (
                           <div className='row mb-3' key={data._id}>
                               <div className='fs-3 m-3'>{data.CategoryName}</div>
                               <hr style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                               {foodItems.length > 0 ? (
                                   <div className='row'>
                                       {foodItems
                                           .filter((items) => 
                                               items.CategoryName === data.CategoryName && 
                                               items.name.toLowerCase().includes(search.toLowerCase())
                                           )
                                           .map((filterItems) => (
                                               <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 mb-4'>
                                                   <Card 
                                                       foodItem={filterItems}
                                                       options={filterItems.options[0]}
                                                   />
                                               </div>
                                           ))
                                       }
                                   </div>
                               ) : (
                                   <div>No food items available</div>
                               )}
                           </div>
                       )
                   })
               ) : (
                   <div>Loading...</div>
               )}
           </div>
           <Footer />
       </div>
   )
}