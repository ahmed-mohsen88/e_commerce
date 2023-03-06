import { Typography } from "@mui/material";

export const StyledParagraph = (props) => (
  <Typography
    component={"p"}
    sx={{
      fontSize: { xs: "10px", md: "15px" },
    }}
  >
    {props.children}
  </Typography>
);
export const StyledBoldParagraph = (props) => (
  <Typography
    component={"p"}
    sx={{
      fontSize: { xs: "10px", md: "15px" },
      fontWeight: "bold",
    }}
  >
    {props.children}
  </Typography>
);
