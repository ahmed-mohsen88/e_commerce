import "./App.css";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import ShoppingCart from "./pages/ShoppingCart";

import { useEffect, useState } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./store";
import Navbar from "./components/Navbar";
import { setProducts } from "./redux/mainSlice";
function App() {
  const [products, setproducts] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    const resp = await axios.get(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    );
    setproducts(resp.data);
    dispatch(setProducts(resp.data));
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home products={products} />} />
          <Route
            path="/shoppingCart"
            element={<ShoppingCart products={products} />}
          />
        </Routes>
      </Provider>
    </>
  );
}

export default App;
