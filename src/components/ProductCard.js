import { Alert, Box, Button, Grid, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOneSelector, setaddOne } from "../redux/addSlice.js";
import {
  addItemsSelector,
  setAddItems,
  setAddExistingShoppingItem,
} from "../redux/shoppingItmesSlice.js";

function ProductCard({ name, price, image, id, quantity }) {
  // #### global vars
  const add = useSelector(addOneSelector);
  const dispatch = useDispatch(add);

  const [errorMessage, seterrorMessage] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    seterrorMessage(false);
  };
  // #### Add to cart
  const shoppingItemsSelector = useSelector(addItemsSelector);
  const handelAdd = (e, id, name, price, image, quantity) => {
    if (!shoppingItemsSelector.length) {
      dispatch(
        setAddItems([
          {
            name: name,
            price: price,
            id: id,
            image: image,
            count: 1,
            quantity: quantity - 1,
          },
        ])
      );
      dispatch(setaddOne(1));
      seterrorMessage(false);
    } else {
      const exist_Or_Not = shoppingItemsSelector.some((shoppingItems) => {
        return shoppingItems.id === id;
      });
      if (exist_Or_Not) {
        const addExist = shoppingItemsSelector.map((shoppingItems) => {
          if (shoppingItems.quantity !== 0) {
            if (shoppingItems.id === id) {
              const plusCount = shoppingItems.count + 1;
              const qty = shoppingItems.quantity - 1;
              shoppingItems = {
                ...shoppingItems,
                count: plusCount,
                quantity: qty,
              };
              dispatch(setaddOne(1));
              seterrorMessage(false);
            }
          } else {
            shoppingItems = {
              ...shoppingItems,
            };
            seterrorMessage(true);
          }
          return shoppingItems;
        });
        dispatch(setAddItems(addExist));
      } else {
        dispatch(
          setAddExistingShoppingItem({
            name: name,
            price: price,
            id: id,
            image: image,
            count: 1,
            quantity: quantity - 1,
          })
        );
        dispatch(setaddOne(1));
        seterrorMessage(false);
      }
    }
  };

  return (
    <Grid
      item
      key={id}
      md={5}
      minHeight={"250px"}
      maxHeight={"22%"}
      width={"100%"}
      boxShadow={"0 0 5px 4px rgb(245,246,240)"}
      padding={"15px"}
      justifyContent={"space-around"}
      display={"flex"}
      flexDirection={"column"}
      gap={"7.5px"}
      borderRadius={"9px"}
      sx={{ marginLeft: "0 !important" }}
      ml={0}
    >
      {errorMessage && (
        <Snackbar
          open={errorMessage}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            No more items Left in Store{" "}
          </Alert>
        </Snackbar>
      )}
      <Grid container justifyContent={"space-between"}>
        <Typography variant="body1" fontSize={"1rem"} fontWeight={"800"}>
          {name}
        </Typography>
        <Typography
          variant="body1"
          fontSize={"1rem"}
          fontWeight={"300"}
          color={quantity === 0 ? "error" : "grey"}
        >
          {quantity === 0 ? "Not available" : `${quantity} in Store`}
        </Typography>
      </Grid>
      <Grid position={"relative"} minHeight={"120px"}>
        <Box
          borderRadius={"9px"}
          component={"img"}
          src={image}
          position={"absolute"}
          width="100%"
          height={"100%"}
          zIndex={0}
        />
      </Grid>
      <Grid
        justifyContent={"space-between"}
        alignItems={"center"}
        display={"flex"}
      >
        <Typography
          variant="body1"
          // fontSize={"1rem"}
          fontWeight={"800"}
          // paddingLeft={"1em"}
        >
          {"Rs "}
          {price}
        </Typography>
        {quantity !== 0 && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              // fontSize: ".8rem",
            }}
            onClick={(e) => {
              handelAdd(e, id, name, price, image, quantity);
            }}
          >
            Add to cart
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default ProductCard;
