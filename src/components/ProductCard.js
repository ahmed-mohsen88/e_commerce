import { Alert, Box, Button, Grid, Snackbar } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addOneSelector, setaddOne } from "../redux/addSlice.js";
import {
  addItemsSelector,
  setAddItems,
  setAddExistingShoppingItem,
} from "../redux/shoppingItmesSlice.js";
import { exist_Or_Not } from "../assets/functions/shoppingItems_functions.js";
import {
  StyledBoldParagraph,
  StyledParagraph,
} from "../assets/styled_components/styled.js";

function ProductCard({ name, price, image, id, quantity }) {
  // #### global vars
  const add = useSelector(addOneSelector);
  const dispatch = useDispatch(add);
  const shoppingItemsSelector = useSelector(addItemsSelector);

  // error message state
  const [errorMessage, seterrorMessage] = useState(false);
  // click away state
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    seterrorMessage(false);
  };
  // #### Add to cart
  const handelAdd = (e, id, name, price, image, quantity) => {
    // adding products if cart total empty
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
      //  function return product count +1 and product quantity -1 if product available in store OR
      //  return same count & quantity & error message if user add more than available
      const productExist = exist_Or_Not(shoppingItemsSelector, id);
      if (productExist) {
        // increase count if product exists
        const addExist = shoppingItemsSelector.map((shoppingItems) => {
          if (shoppingItems.quantity !== 0) {
            // increase count of products if product exists in the cart
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
            // return same cart if user add more than available quantity
            shoppingItems = {
              ...shoppingItems,
            };
            seterrorMessage(true);
          }
          return shoppingItems;
        });
        dispatch(setAddItems(addExist));
      } else {
        // add another product not included in the cart
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
      sm={7}
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
      {/* card top */}
      <Grid container justifyContent={"space-between"}>
        <StyledBoldParagraph
          variant="body1"
          fontSize={"1rem"}
          fontWeight={"800"}
        >
          {name}
        </StyledBoldParagraph>
        <StyledParagraph
          variant="body1"
          fontSize={"1rem"}
          fontWeight={"300"}
          color={quantity === 0 ? "error" : "grey"}
        >
          {quantity === 0 ? "Not available" : `${quantity} in Store`}
        </StyledParagraph>
      </Grid>
      {/* card image */}
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
      {/* card bottom */}
      <Grid
        justifyContent={"space-between"}
        alignItems={"center"}
        display={"flex"}
      >
        <StyledBoldParagraph
          variant="body1"
          // fontSize={"1rem"}
          fontWeight={"800"}
          // paddingLeft={"1em"}
        >
          {"Rs "}
          {price}
        </StyledBoldParagraph>
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
            <StyledParagraph>Add to cart</StyledParagraph>
          </Button>
        )}
      </Grid>
    </Grid>
  );
}

export default ProductCard;
