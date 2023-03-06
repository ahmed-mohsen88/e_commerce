import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
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

  // #### Add to cart
  const shoppingItemsSelector = useSelector(addItemsSelector);
  const handelAdd = (e, id, name, price, image) => {
    dispatch(setaddOne(1));
    if (!shoppingItemsSelector.length) {
      dispatch(
        setAddItems([
          {
            name: name,
            price: price,
            id: id,
            image: image,
            count: 1,
          },
        ])
      );
    } else {
      const exist_Or_Not = shoppingItemsSelector.some((shoppingItems) => {
        return shoppingItems.id === id;
      });
      if (exist_Or_Not) {
        const addExist = shoppingItemsSelector.map((shoppingItems) => {
          if (shoppingItems.id === id) {
            const plusCount = shoppingItems.count + 1;
            shoppingItems = { ...shoppingItems, count: plusCount };
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
          })
        );
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
      <Grid container justifyContent={"space-between"}>
        <Typography variant="body1" fontSize={"1rem"} fontWeight={"800"}>
          {name}
        </Typography>
        <Typography
          variant="body1"
          fontSize={"1rem"}
          fontWeight={"300"}
          color={"grey"}
        >
          {quantity}
          {" in Store"}
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
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            // fontSize: ".8rem",
          }}
          onClick={(e) => {
            handelAdd(e, id, name, price, image);
          }}
        >
          Add to cart
        </Button>
      </Grid>
    </Grid>
  );
}

export default ProductCard;
