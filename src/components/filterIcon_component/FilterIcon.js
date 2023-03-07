import React, { useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { useDispatch, useSelector } from "react-redux";
import { filterSelector, setFilter } from "../../redux/filterSlice";
import { filteredCollected, newFilter } from "../../assets/functions/functions";
import { productsSelector } from "../../redux/mainSlice";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import Mapperr from "./Mapperr";

function FilterIcon({ handelChange }) {
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
    const selectedKeys = filteredCollected(reduxstate);
    const multiPropsFilter = newFilter(products, selectedKeys);
    handelChange(multiPropsFilter);
  };

  const [filterState, setfilterState] = useState({
    mainFilter: false,
    color: false,
    type: false,
    price: false,
    gender: false,
  });
  const handelFilterIcon = (filter) => {
    const clone = { ...filterState };
    for (const key in clone) {
      if (key === filter) {
        clone[key] = !clone[key];
      } else if (key === "mainFilter") {
        clone[key] = filterState[key];
      } else {
        clone[key] = false;
      }
    }
    setfilterState(clone);
  };

  const color = ["Red", "Blue", "Black", "Green"];
  const type = ["Polo", "Hoodie", "Basic"];
  const gender = ["Men", "Women"];
  const price = [250, 450, 451];

  const checkButton = (searchProp) => {
    return (
      <Button
        endIcon={<ArrowRightIcon />}
        onClick={() => {
          handelFilterIcon(searchProp);
        }}
        sx={{
          width: "19vw",
          justifyContent: "space-between",
          fontSize: { xs: "10px", md: "15px" },
        }}
      >
        {searchProp}
      </Button>
    );
  };

  return (
    <ClickAwayListener
      onClickAway={() => {
        setfilterState({
          mainFilter: false,
          color: false,
          type: false,
          price: false,
          gender: false,
        });
      }}
    >
      <Grid
        position={"relative"}
        width="46%"
        container
        justifyContent={"flex-start"}
      >
        {/* main button */}
        <Button
          onClick={() => {
            handelFilterIcon("mainFilter");
          }}
        >
          <FilterAltIcon sx={{ color: "black", alignSelf: "flex-start" }} />
        </Button>
        {filterState.mainFilter && (
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Grid>
              {checkButton("color")}
              {filterState.color && (
                <Grid>
                  <Mapperr
                    handelCheckbox={handelCheckbox}
                    filterStateSelector={filterStateSelector}
                    searchProp={color}
                  />
                </Grid>
              )}
            </Grid>
            <Grid>
              {checkButton("price")}
              {filterState.price && (
                <Grid>
                  <Mapperr
                    handelCheckbox={handelCheckbox}
                    filterStateSelector={filterStateSelector}
                    searchProp={price}
                  />
                </Grid>
              )}
            </Grid>
            {checkButton("gender")}
            {filterState.gender && (
              <Grid>
                <Mapperr
                  handelCheckbox={handelCheckbox}
                  filterStateSelector={filterStateSelector}
                  searchProp={gender}
                />
              </Grid>
            )}
            {checkButton("type")}
            {filterState.type && (
              <Grid>
                <Mapperr
                  handelCheckbox={handelCheckbox}
                  filterStateSelector={filterStateSelector}
                  searchProp={type}
                />
              </Grid>
            )}
          </Box>
        )}
      </Grid>
    </ClickAwayListener>
  );
}

export default FilterIcon;
