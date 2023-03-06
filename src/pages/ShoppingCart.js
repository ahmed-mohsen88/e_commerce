import { Container, Grid, Stack, Typography } from "@mui/material";
import ShoppingItems from "../components/ShoppingItems";
import React from "react";
import "../assets/css/shoppingCart.css";

function ShoppingCart() {
  return (
    <Container >
      <Stack gap={"30px"} marginTop={"30px"} sx={{ display: "flex" }}>
        <Grid container>
          <Typography variant="h4">Shopping Cart</Typography>
        </Grid>
        <ShoppingItems />
      </Stack>
    </Container>
  );
}

export default ShoppingCart;
