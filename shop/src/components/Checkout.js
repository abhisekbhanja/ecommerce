import React from "react";
import { useSelector } from "react-redux";

export default function Checkout() {
  const cartsdata = useSelector((state) => state.mycart);

  var sum = 0;
  cartsdata.map((x) => {
    sum = sum + x.price * x.quantity;
  });
  return (
    <div className="mt-5">
      <br />
      <h4 className="p-3 mt-4 text-center">Check Out</h4>

      <div className="card d-block m-auto text-center w-50 p-5">
        <div className="card-body">
          <h5 className="text-success">Checkout successfully</h5>
          <p>Total amount: {sum}$</p>
        </div>
      </div>
    </div>
  );
}
