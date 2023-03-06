import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import React from "react";
import { filterSelector } from "../../redux/filterSlice";
import { useSelector } from "react-redux";

function Color({ handelCheckbox }) {
  const filterStateSelector = useSelector(filterSelector);
  return (
    <Stack>
      <Typography variant="h5">Color</Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="Red"
        checked={filterStateSelector.color.Red}
        onChange={() => handelCheckbox("Red", "color")}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Blue"
        checked={filterStateSelector.color.Blue}
        onChange={() => handelCheckbox("Blue", "color")}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Green"
        checked={filterStateSelector.color.Green}
        onChange={() => handelCheckbox("Green", "color")}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Black"
        checked={filterStateSelector.color.Black}
        onChange={() => handelCheckbox("Black", "color")}
      />
    </Stack>
  );
}

export default Color;
