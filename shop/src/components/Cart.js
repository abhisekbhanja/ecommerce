import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from 'react-router-dom'
import { Link } from "react-router-dom";
import { productsContext } from "../ProductState/productsContext";
import { incquantity, decquantity } from "../state/action-creator";
import "../style.css";
import axios from 'axios'

import "../stylesheet/cart.css";
export default function Cart({ removeproduct }) {
  //////////////

  const cartsdata = useSelector((state) => state.mycart);
  const navigate = useNavigate();
  var sum = 0;
  cartsdata.map((x) => {
    sum = sum + x.price * x.quantity;
  });

  const dispatch = useDispatch();

  const inc = (q1) => {
    dispatch(incquantity(q1));
  };

  const dec = (q2) => {
    dispatch(decquantity(q2));
  };
  /////////////////
  
  const [user, setuser] = useState(true);
  const showuser=async()=>{
    try {
     const alldata=await axios.get(`${process.env.REACT_APP_SURL}`,
     {
       headers: {
          "login-token" : localStorage.getItem("loginusertoken")
        }
      }
     )
     setuser(alldata.data)
     //console.log(alldata)
    } catch (err) {
    
     
      if(err=="Error: Request failed with status code 400"){
        //console.log("access denied")
        navigate("/login")
      }
      else{
       console.log(err)
      }
    }
   }

   useEffect(() => {
    showuser()
   }, [])
   


  /////////////////
const buynow=(total)=>{
 
  if(user.firstname==""){
    navigate("/login")
  }
  else{
    axios.post(`${process.env.REACT_APP_SURL}/order`,{total:total}).then((info)=>{
      //console.log(total)
      //console.log(info)
  var options = {
    "key": process.env.REACT_APP_APIKEY, 
    // "amount": info.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": "Acme Corp",
    "description": "Test Transaction",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVfBDn4_cYMz-d-b3Wr4cxXNkMkjwzws27Ug&usqp=CAU",
    "order_id": info.data.id, //This is a sample Order ID. Pass the `id` obtained in the previous step
    "handler": function (response){
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        navigate("/success");
    },
    "prefill": {
        "name": user.firstname,
        "email": user.email,
        "contact": user.mobile
    },
    "notes": {
        "address": "Razorpay Corporate Office"
    },
    "theme": {
        "color": "#2E2EFF"
    }
  };
  
  var rzp1 = new window.Razorpay(options);
  
  
  
    rzp1.open();
    total.preventDefault();
  
  })
  }
   


}

  return (
    <div>
      {cartsdata.length == 0 ? (
        <h1>
          <br />
          <h1 className="m-5 text-center">cart is empty</h1>
        </h1>
      ) : (
        <div className="container-fluid mt-5">
          <Link to="/">
            <button className="btn btn-outline-primary btn-sm mt-4">
              back
            </button>
          </Link>

          {cartsdata.map((x) => {
            return (
              <div key={x.title} className="card m-2 p-4">
                <div className="row">
                  <div className="col-6">
                    <Link to={`/productdetails/${x.id}`}>
                      <img className="cart-img" src={x.image} alt="" />
                    </Link>
                  </div>
                  <div className="col-6">
                    <p className="product-name">{x.title}</p>
                    <button
                      className="btn btn-info btn-sm quantity-btn"
                      onClick={() => inc(x.id)}
                    >
                      +
                    </button>

                    <span className="px-4 product-name">
                      <b>{x.quantity}</b>
                    </span>

                    {x.quantity > 0 ? (
                      <button
                        className="btn btn-info btn-sm quantity-btn"
                        onClick={() => dec(x.id)}
                      >
                        -
                      </button>
                    ) : (
                      " "
                    )}
                    <p className="product-name mt-1">
                      <b>
                        {x.price} X {x.quantity}={x.price * x.quantity}$
                      </b>
                    </p>
                    <button
                      className="btn btn-danger btn-sm remove-btn"
                      onClick={() => removeproduct(x.title)}
                    >
                      remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="ck d-block m-auto text-center">
            <h5> Total : {sum}$</h5>
            <button
              onClick={()=>buynow(sum)}
              className="btn btn-outline-secondary font-weight-bold"
            >
              proceed to check out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
