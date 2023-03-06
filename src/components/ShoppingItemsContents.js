import React from "react";
import { Avatar, Button, Grid, Typography } from "@mui/material";
import { StyledBoldParagraph, StyledParagraph } from "../assets/styled";

function ShoppingItemsContents({
  shoppingItemsSelector,
  handelAddClick,
  handelDelete,
}) {
  return (
    <>
      {shoppingItemsSelector.map((shoppingItem) => {
        return (
          <Grid
            container
            width={"100%"}
            alignItems={"center"}
            justifyContent={"flex-start"}
            spacing={1}
            columnSpacing={3}
            paddingLeft={"1em"}
            key={shoppingItem.id}
          >
            <Avatar alt={shoppingItem.name} src={shoppingItem.image} />
            <Grid item xs={3} md={1.5}>
              <StyledBoldParagraph>{shoppingItem.name}</StyledBoldParagraph>
              <StyledBoldParagraph>{shoppingItem.price}</StyledBoldParagraph>
            </Grid>
            <Grid
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              textAlign={"center"}
            >
              <Button
                onClick={() => {
                  handelAddClick(shoppingItem, 1);
                }}
                sx={{ minWidth: "30%" }}
              >
                +
              </Button>
              <Typography
                noWrap
                width="12vw"
                sx={{ fontSize: { xs: "10px", md: "15px" } }}
              >
                {"QTY "} {shoppingItem.count}
              </Typography>
              <Button
                onClick={() => {
                  handelAddClick(shoppingItem, -1);
                }}
                sx={{ minWidth: "30%" }}
              >
                -
              </Button>
            </Grid>

            <Grid>
              <Button
                sx={{ fontSize: { xs: "10px", md: "15px" } }}
                onClick={() => {
                  handelDelete(shoppingItem);
                }}
              >
                Delete
              </Button>
            </Grid>

            <Grid
              display="flex"
              alignItems={"center"}
              justifyContent={"center"}
              item
              padding={"0"}
            >
              <StyledParagraph>
                {" "}
                {" Rs "} {shoppingItem.price * shoppingItem.count}
              </StyledParagraph>
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}

export default ShoppingItemsContents;
