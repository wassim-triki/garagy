import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
const radioStyles = {
  color: "#F4B251",
  "&.Mui-checked": {
    color: "#F4B251",
  },
};
const UserTypeOptions = (handleOnChange) => {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked
            sx={radioStyles}
            value={"customer"}
            onChange={handleOnChange.handleOnChange}
          />
        }
        label="Customer"
      />
      <FormControlLabel
        control={
          <Checkbox
            sx={radioStyles}
            onChange={handleOnChange.handleOnChange}
            value={"seller"}
          />
        }
        label="Seller"
      />
    </FormGroup>
  );
};

export default UserTypeOptions;
