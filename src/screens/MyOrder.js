import React, { useEffect, useState } from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
export default function MyOrder() {
   const [orderData, setOrderData] = useState([])
   const [loading, setLoading] = useState(true)
    const fetchMyOrder = async () => {
       try {
           const userEmail = localStorage.getItem('userEmail')
           if (!userEmail) {
               console.log("No user email found");
               return;
           }
            const response = await fetch("http://localhost:4000/api/myOrderData", {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   email: userEmail
               })
           });
            const data = await response.json();
           console.log("Order data received:", data); // Debug log
           
           if (data.orderData && data.orderData.order_data) {
               setOrderData(data.orderData.order_data);
           }
       } catch (error) {
           console.error('Error fetching orders:', error);
       } finally {
           setLoading(false);
       }
   }
    useEffect(() => {
       fetchMyOrder();
   }, []);
    return (
       <div>
           <div><Navbar /></div>
           <div className='container'>
               <div className='row'>
                   {orderData.length > 0 ? (
                       orderData.map((orderGroup, index) => (
                           <div key={index} className="col-12 mb-4">
                               {orderGroup.map((item, itemIndex) => (
                                   <div key={itemIndex}>
                                       {item.Order_date ? (
                                           <div className='m-auto mt-5'>
                                               <h4>Order Date: {item.Order_date}</h4>
                                               <hr />
                                           </div>
                                       ) : (
                                           <div className='col-12 col-md-6 col-lg-3' style={{ display: 'inline-block' }}>
                                               <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                                   <img
                                                       src={item.img}
                                                       className="card-img-top"
                                                       alt={item.name}
                                                       style={{ height: "120px", objectFit: "cover" }}
                                                       onError={(e) => {
                                                           e.target.onerror = null;
                                                           e.target.src = 'https://via.placeholder.com/120?text=Image+Not+Found';
                                                       }}
                                                   />
                                                   <div className="card-body">
                                                       <h5 className="card-title">{item.name}</h5>
                                                       <div className='container w-100 p-0'>
                                                           <span className='m-1'>Quantity: {item.qty}</span>
                                                           <span className='m-1'>Size: {item.size}</span>
                                                           <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                               ₹{item.price}/-
                                                           </div>
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                       )}
                                   </div>
                               ))}
                           </div>
                       ))
                   ) : (
                       <div className='text-center fs-3 mt-5'>
                           {loading ? "Loading..." : "No orders found"}
                       </div>
                   )}
               </div>
           </div>
           <div><Footer /></div>
       </div>
   )
}