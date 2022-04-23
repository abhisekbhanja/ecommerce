import React, { useContext, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { productsContext } from "../ProductState/productsContext";
import "../style.css";
export default function ProductDetails({ addproduct }) {
  const carts = useContext(productsContext);
  const [details, setdetails] = useState("");
  //get the parameter from url use useParams hook
  const p = useParams().id;
  //console.log("id " + p);
  const [productload, setproductload] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      fetchItem();
    }, 2000);
  }, []);

  const fetchItem = async () => {
    const details = await fetch(`${process.env.REACT_APP_URL}/${p}`);
    const item = await details.json();
    setdetails(item);
    setproductload(false);
    //console.log(item);
  };
  return (
    <div>
      <div className="container">
        <Link to="/">
          <button className="btn btn-outline-primary mt-3">back</button>
        </Link>
        {productload ? (
          <ProductdetailsLoad />
        ) : (
          <div className="card details_card p-5 mt-5">
            <img src={details.image} />
            <div className="card-body">
              <br></br>
              <h5 className="card-title text-warning">
                <b>{details.title}</b>
              </h5>
              <h5 className="card-title">Catagory: {details.category}</h5>
              <h5 className="card-title">Description: {details.description}</h5>
              <p className="card-text text-primary">
                <b>{details.price}rs</b>
              </p>
              <button
                className="btn btn-success"
                onClick={() =>
                  addproduct(
                    details.title,
                    details.image,
                    details.price,
                    details.id
                  )
                }
              >
                add to cart
              </button>
              <br />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const ProductdetailsLoad = () => {
  return (
    <div>
      <div className="card details_card p-5 mt-5">
        <Skeleton height={250} width={300} />
        <div className="card-body">
          <br></br>
          <h5 className="card-title text-warning">
            {" "}
            <Skeleton width={600} />
          </h5>
          <h5 className="card-title">
            <Skeleton width={600} />
          </h5>
          <h5 className="card-title">
            <Skeleton width={900} height={100} />
          </h5>
          <p className="card-text text-primary">
            <Skeleton width={100} />
          </p>
          <Skeleton width={50} />
          <br />
        </div>
      </div>
    </div>
  );
};
