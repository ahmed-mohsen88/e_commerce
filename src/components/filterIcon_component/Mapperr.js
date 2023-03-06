import React from "react";
import { Checkbox, Grid, Typography } from "@mui/material";
import { arrayName } from "../../assets/functions";

function Mapperr({ handelCheckbox, searchProp, filterStateSelector }) {
  return (
    <>
      {searchProp.map((el) => {
        const name = arrayName(el);
        return (
          <Grid
            key={el}
            container
            justifyContent={"flex-start"}
            alignItems={"center"}
          >
            <Checkbox
              checked={filterStateSelector[name][el]}
              onChange={() => handelCheckbox(el, name)}
              sx={{ "& .MuiSvgIcon-root": { fontSize: "14px" } }}
            />
            <Typography sx={{ fontSize: { xs: "10px", md: "15px" } }}>
              {el}
            </Typography>
          </Grid>
        );
      })}
    </>
  );
}

export default Mapperr;
