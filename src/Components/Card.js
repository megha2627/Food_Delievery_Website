import React, { useState, useRef, useEffect } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
export default function Card(props) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();

  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")

  const options = props.options || {};
  const priceOptions = Object.keys(options);

  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food.length !== 0) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty
        })
        return
      }
      else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.foodItem.img
        })
        return
      }
      return
    }

    await dispatch({
      type: "DD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
      img: props.foodItem.img
    })
  }
  useEffect(() => {
    setSize(priceOptions[0])
  }, [priceOptions])
  const finalPrice = qty * parseInt(options[size]);

  return (
    <div className="card mt-3" style={{ width: "18rem", maxHeight: "500px" }}>
      <img
        src={props.foodItem.img}
        className="card-img-top"
        alt={props.foodItem.name}
        style={{ height: "200px", objectFit: "cover" }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/200x200?text=Image+Not+Found"
        }}
      />
      <div className="card-body">
        <h5 className="card-title">{props.foodItem.name}</h5>
        <p className="card-text" style={{ fontSize: '0.9rem' }}>
          {props.foodItem.description}
        </p>

        <div className="container w-100 p-0">
          <select
            className="m-2 h-100 bg-success rounded"
            style={{ select: "#FF0000" }}
            onChange={(e) => setQty(e.target.value)}
            value={qty}
          >
            {Array.from(Array(6), (e, i) => {
              return (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              )
            })}
          </select>
          <select
            className="m-2 h-100 bg-success rounded"
            style={{ select: "#FF0000" }}
            onChange={(e) => setSize(e.target.value)}
            value={size}
          >
            {priceOptions.map((data) => {
              return <option key={data} value={data}>{data}</option>
            })}
          </select>
          <div className="d-inline fs-5">
            ₹{finalPrice}/-
          </div>
        </div>
        <hr />
        <button
          className="btn btn-success justify-center ms-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

