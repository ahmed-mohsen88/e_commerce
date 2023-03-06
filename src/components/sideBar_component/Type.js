import React from "react";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { filterSelector } from "../../redux/filterSlice";
import { useSelector } from "react-redux";
function Type({handelCheckbox}) {
  const filterStateSelector = useSelector(filterSelector);

  return (
    <Stack>
      <Typography variant="h5">Type</Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="Polo"
        checked={filterStateSelector.type.Polo}
        onChange={() => handelCheckbox("Polo", "type")}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Hoodie"
        checked={filterStateSelector.type.Hoodie}
        onChange={() => handelCheckbox("Hoodie", "type")}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Basic"
        checked={filterStateSelector.type.Basic}
        onChange={() => handelCheckbox("Basic", "type")}
      />
    </Stack>
  );
}

export default Type;
