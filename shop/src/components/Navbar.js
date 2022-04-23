import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productsContext } from "../ProductState/productsContext";
import '../stylesheet/cart.css'

export default function Navbar() {
  const count = useSelector((state) => state.mycart);
  const carts = useContext(productsContext);
  const [showbtn, setshowbtn] = useState(true);
  const [user, setuser] = useState(true);

const showuser=async()=>{
 try {
  const alldata=await axios.get(process.env.REACT_APP_SURL,
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
    setshowbtn(false)
   }
   else{
    console.log(err)
   }
 }
}
useEffect(() => {
 showuser()
}, [])

 
const logout=()=>{
  //console.log("logout...........");
  localStorage.removeItem("loginusertoken");
  // window.reload();
  window.location.reload(false);
}

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark fixed-top">
        <Link to="/" className="navbar-brand" href="#">
          Ecart5
        </Link>

        {showbtn ?        
                     <div className="dropdown ml-auto">
                     <button className="btn btn-secondary dropdown-toggle" 
                     type="button" id="dropdownMenuButton" data-toggle="dropdown"
                      aria-haspopup="true" aria-expanded="false">
                      <i className="fa fa-user" aria-hidden="true"></i> {user.firstname}
                     </button>
                     <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                       <a className="dropdown-item logout" onClick={logout}>Logout</a>
                     </div>
                   </div>
         
         :<Link to="/login" className="btn btn-success">
         login
        </Link>}
        <Link className="nav-link text-warning" to="/cart">
                {" "}
                <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                cart ({count.length})
              </Link>
      
        
       
      </nav>
    </div>
  );
}
