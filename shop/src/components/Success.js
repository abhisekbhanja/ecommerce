import React from 'react'
import { Link } from "react-router-dom";
import "../stylesheet/cart.css";

export default function Success() {
  return (
    <div className="container text-center notfound mt-5">
      <br /><br /><br /><br /><br /><br /><br /><br /><br />
      <h5 className='text-success mt-5'>Payment Successful</h5>
      <h5>You order is placed</h5>
      <Link to="/" className="btn btn-primary btn-sm mt-4">
        goto home page
      </Link>
    </div>
  )
}
