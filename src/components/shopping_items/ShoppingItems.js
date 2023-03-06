import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, useMediaQuery } from "@mui/material";
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
    } else {
      dispatch(setaddOne(addOrSub));
    }
  };

  const handelDelete = (shoppingItem) => {
    const filteredArray = deleteItem(shoppingItem, shoppingItemsSelector);
    dispatch(setAddItems(filteredArray));
    dispatch(setaddOne(-1 * shoppingItem.count));
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
      </Grid>
    </>
  );
}

export default ShoppingItems;
