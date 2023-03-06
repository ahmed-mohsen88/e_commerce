import React from "react";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { filterSelector } from "../../redux/filterSlice";
import { useSelector } from "react-redux";

function Gender({handelCheckbox}) {
  const filterStateSelector = useSelector(filterSelector);
  return (
    <Stack>
      <Typography variant="h5">Gender</Typography>
      <FormControlLabel
        control={<Checkbox />}
        label="Men"
        checked={filterStateSelector.gender.Men}
        onChange={() => handelCheckbox("Men", "gender")}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Women"
        checked={filterStateSelector.gender.Women}
        onChange={() => handelCheckbox("Women", "gender")}
      />
    </Stack>
  );
}

export default Gender;
