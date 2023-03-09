import { Box, Divider, Grid, List, Stack, useMediaQuery } from "@mui/material";
import React from "react";
import { productsSelector } from "../../redux/mainSlice";
import { useDispatch, useSelector } from "react-redux";
import { filterSelector, setFilter } from "../../redux/filterSlice";
import { newFilter, trueKeyFilter } from "../../assets/functions/functions";
import Color from "./Color";
import Gender from "./Gender";
import Price from "./Price";
import Type from "./Type";

function Sidebar({ stateProduct, handelChange }) {
  const matches = useMediaQuery("(max-width:973px)");
  const products = useSelector(productsSelector);
  const filterStateSelector = useSelector(filterSelector);

  const dispatch = useDispatch();

  const handelCheckbox = (searchProperty, filteredState) => {
    const reduxstate = { ...filterStateSelector };
    reduxstate[filteredState] = {
      ...reduxstate[filteredState],
      [searchProperty]: !reduxstate[filteredState][searchProperty],
    };
    dispatch(setFilter(reduxstate));
    const selectedKeys = trueKeyFilter(reduxstate);
    const multiPropsFilter = newFilter(products, selectedKeys);
    handelChange(multiPropsFilter);
  };
  return (
    <Stack
      width="30%"
      sx={{
        display: `${matches ? "none" : "flex"}`,
      }}
    >
      <List
        sx={{
          // width: "100%",
          // maxWidth: 360,
          bgcolor: "background.paper",
          padding: "20px",
          marginTop: "80px",
        }}
      >
        <Box boxShadow={"0 0 5px 4px rgb(245,246,240)"}>
          <Grid container>
            <Color handelCheckbox={handelCheckbox} />
          </Grid>
          <Divider variant="middle" component="li" />
          <Grid container>
            <Gender handelCheckbox={handelCheckbox} />
          </Grid>
          <Divider variant="middle" component="li" />
          <Grid container>
            <Price handelCheckbox={handelCheckbox} />
          </Grid>
          <Divider variant="middle" component="li" />
          <Grid container>
            <Type handelCheckbox={handelCheckbox} />
          </Grid>
        </Box>
      </List>
    </Stack>
  );
}

export default Sidebar;
