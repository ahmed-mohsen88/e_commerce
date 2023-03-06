import React from "react";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { filterSelector } from "../redux/filterSlice";
import { useSelector } from "react-redux";
function Price({handelCheckbox}) {
  const filterStateSelector = useSelector(filterSelector);

  return (
    <Stack>
      <Typography variant="h5">Price</Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="0 - 250 RS"
        checked={filterStateSelector.price[250]}
        onChange={() => handelCheckbox(250, "price")}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="251 - 450 RS"
        checked={filterStateSelector.price[450]}
        onChange={() => handelCheckbox(450, "price")}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="RS 450"
        checked={filterStateSelector.price[451]}
        onChange={() => handelCheckbox(451, "price")}
      />
    </Stack>
  );
}

export default Price;
