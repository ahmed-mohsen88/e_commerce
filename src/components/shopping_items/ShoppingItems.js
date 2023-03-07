import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Grid, Snackbar, useMediaQuery } from "@mui/material";
import {
  addItemsSelector,
  setAddItems,
} from "../../redux/shoppingItmesSlice.js";
import { setaddOne } from "../../redux/addSlice.js";
import {
  StyledBoldParagraph,
  StyledParagraph,
} from "../../assets/styled_components/styled.js";
import ShoppingItemsContents from "./ShoppingItemsContents.js";
import {
  deleteItem,
  increaseCount,
} from "../../assets/functions/shoppingItems_functions.js";

function ShoppingItems() {
  // #### global variables
  const matches = useMediaQuery("(max-width:500px)");
  const shoppingItemsSelector = useSelector(addItemsSelector);
  const dispatch = useDispatch();
  const [errorMessage, seterrorMessage] = useState(false);

  // #### state to get total price
  const [totalSum, settotalSum] = useState(0);

  // #### use effect to change price with every increase or decrease QTY Or delete items
  useEffect(() => {
    let sum = 0;
    shoppingItemsSelector.map((el) => {
      return (sum += el.price * el.count);
    });
    settotalSum(sum);
  }, [shoppingItemsSelector]);

  const handelAddClick = (shoppingItem, addOrSub) => {
    const qty_plus_or_minus = increaseCount(
      shoppingItem,
      addOrSub,
      shoppingItemsSelector
    );
    dispatch(setAddItems(qty_plus_or_minus));
    if (shoppingItem.count === 0) {
      const filteredArray = deleteItem(shoppingItem, shoppingItemsSelector);
      dispatch(setAddItems(filteredArray));
    } else if (shoppingItem.quantity === 0 && addOrSub === 1) {
      dispatch(setaddOne(0));
      seterrorMessage(true);
    } else {
      dispatch(setaddOne(addOrSub));
      seterrorMessage(false);
    }
  };

  const handelDelete = (shoppingItem) => {
    const filteredArray = deleteItem(shoppingItem, shoppingItemsSelector);
    dispatch(setAddItems(filteredArray));
    dispatch(setaddOne(-1 * shoppingItem.count));
  };

  // click away state
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    seterrorMessage(false);
  };

  return (
    <>
      {shoppingItemsSelector ? (
        <ShoppingItemsContents
          shoppingItemsSelector={shoppingItemsSelector}
          handelAddClick={handelAddClick}
          handelDelete={handelDelete}
        />
      ) : (
        <></>
      )}
      <Grid
        sx={{ borderTop: "1px solid black" }}
        container
        justifyContent={"center"}
        width={matches ? "100%" : "60%"}
        paddingTop={"2rem"}
      >
        <StyledBoldParagraph>Total Amount{": Rs "}</StyledBoldParagraph>
        <StyledParagraph> {totalSum}</StyledParagraph>
        {errorMessage && (
          <Snackbar
            open={errorMessage}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              No more items Left in Store
            </Alert>
          </Snackbar>
        )}
      </Grid>
    </>
  );
}

export default ShoppingItems;
