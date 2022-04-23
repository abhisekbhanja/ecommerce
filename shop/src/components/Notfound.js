import React from "react";
import { Link } from "react-router-dom";
import "../stylesheet/cart.css";

export default function Notfound() {
  return (
    <div className="container text-center notfound">
      <h3>Page not found</h3>
      <Link to="/" className="btn btn-primary btn-sm mt-4">
        goto home page
      </Link>
    </div>
  );
}
