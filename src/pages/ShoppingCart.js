import { Container, Grid, Stack, Typography } from "@mui/material";
import ShoppingItems from "../components/shopping_items/ShoppingItems";
import React from "react";

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
