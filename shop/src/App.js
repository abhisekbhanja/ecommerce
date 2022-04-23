import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Notfound from "./components/Notfound";
import ProductDetails from "./components/ProductDetails";
import Products from "./components/Products";
import Signup from "./components/Signup";
import Success from "./components/Success";

//ADD THE ACTIONS NAME FROM ACTION FILE INDEX.JS
import { addproduct, removeproduct } from "./state/action-creator";

function App() {
  const [data, setData] = useState([]);

  const [loading, setloading] = useState(true);
  const [mdata, setmdata] = useState();

  const fetchData = async () => {
    let adata = await axios.get(`${process.env.REACT_APP_URL}?limit=50`);
    setmdata(adata.data);
    let urldata = adata.data;
    //console.log(urldata);
    setloading(false);
    setData(urldata);
  };
  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 2000);
  }, []);

  //USE THE DISPATCH
  const dispatch = useDispatch();

  const addProduct = (title, image, price, id) => {
    dispatch(addproduct(title, image, price, id));
  };
  //console.log("main data V")
//console.log(data)
  //for all category
  let setFilter = () => {
    setData(mdata);
    //console.log(data);
  };

  //remove product from cart
  const removeProduct = (title) => {
    dispatch(removeproduct(title));
  };

  //for to get different categorized
  const getcatagory = (e) => {
    const v = mdata.filter((x) => {
      return x.category === e;
    });
    setData(v);
  };

  const low = () => {
    const myproduct = data.sort((a, b) => {
      return a.price - b.price;
    });

    console.log(myproduct)
    setData([...myproduct]);
  };

  const high = () => {
    const myproduct = data.sort((a, b) => {
      return b.price - a.price;
    });

    setData([...myproduct]);
  };

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Products
                loading={loading}
                data={data}
                addproduct={addProduct}
                getcatagory={getcatagory}
                setFilter={setFilter}
                low={low}
                high={high}
              />
            }
          />
          <Route
            exact
            path="/cart"
            element={<Cart removeproduct={removeProduct} />}
          />
          <Route
            exact
            path="/productdetails/:id"
            element={<ProductDetails addproduct={addProduct} />}
          />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="*" element={<Notfound />} />
          <Route exact path="/success" element={<Success />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
