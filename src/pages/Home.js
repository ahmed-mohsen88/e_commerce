import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Grid,
  Input,
  InputAdornment,
  Stack,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import { productsSelector } from "../redux/mainSlice";
import Sidebar from "../components/sideBar_component/SideBar";
import FilterIcon from "../components/filterIcon_component/FilterIcon";
function Home() {
  // #### global vars
  const products = useSelector(productsSelector);
  const [stateProduct, setStateProduct] = useState([]);
  const matches = useMediaQuery("(max-width:500px)");

  useEffect(() => {
    setStateProduct(products);
  }, [products]);

  // product card
  const productsCardSection = stateProduct?.map((product) => {
    return (
      <ProductCard
        name={product.name}
        price={product.price}
        image={product.imageURL}
        quantity={product.quantity}
        gender={product.gender}
        currency={product.currency}
        type={product.type}
        id={product.id}
        key={product.id}
      />
    );
  });

  // #### search
  // ### state
  const [input, setinput] = useState("");
  const inputRef = useRef("");
  useEffect(() => {
    inputRef.current = input;
  }, [input]);
  // ### function
  const handelSearch = (e) => {
    setinput(e.target.value);
    // if user ++ input
    if (e.target.value.length - inputRef.current.length > 0) {
      const searchResult = products?.filter((product) => {
        return product?.name?.toLowerCase()?.includes(input.toLowerCase());
      });
      setStateProduct(searchResult);
      // if user delete
    } else if (e.target.value.length - inputRef.current.length < 0) {
      setStateProduct(products);
      const searchResult = products?.filter((product) => {
        return product?.name?.toLowerCase()?.includes(input.toLowerCase());
      });
      setStateProduct(searchResult);
    } else if (e.target.value === "") {
      setStateProduct(products);
    }
  };
  const handelChange = (x) => {
    setStateProduct(x);
  };

  return (
    <Container sx={{ display: "flex" }} maxWidth="100%">
      <Sidebar
        stateProduct={stateProduct}
        handelChange={(x) => handelChange(x)}
      />

      <Stack
        padding={"20px"}
        width={"100%"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Grid
          container
          justifyContent={`${matches ? "flex-start" : "center"}`}
          padding={"20px"}
          width="100%"
        >
          <Grid sx={{ width: `${matches ? "52%" : "50%"}` }}>
            <Input
              value={input}
              type="search"
              placeholder="Search for products"
              variant="filled"
              sx={{ width: "100%" }}
              endAdornment={
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              }
              onChange={(e) => {
                handelSearch(e);
              }}
            />
          </Grid>
          {matches && (
            <FilterIcon
              handelChange={(x) => {
                handelChange(x);
              }}
            />
          )}
        </Grid>

        <Grid
          container
          justifyContent={"space-between"}
          alignItems={"center"}
          padding={"20px"}
          rowSpacing={1}
          columnSpacing={2}
          rowGap={"3vw"}
          columnGap={"2vw"}
          columns={16}
          width={"100%"}
        >
          {productsCardSection}
        </Grid>
      </Stack>
    </Container>
  );
}

export default Home;
