import React from "react";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

function CarDialogContent({ car, handleChange }) {
  return (
    <DialogContent>
      <Stack spacing={2} mt={1}>
        <TextField
          label="Brand"
          name="brand"
          value={car.brand}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Model"
          name="model"
          value={car.model}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          label="Year"
          name="year"
          value={car.year}
          onChange={handleChange}
          type="number"
          fullWidth
        />
      </Stack>
    </DialogContent>
  );
}

export default CarDialogContent;
