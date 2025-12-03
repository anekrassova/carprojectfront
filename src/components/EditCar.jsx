import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";

function EditCar({ cardata }) {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({ brand: "", model: "", year: "" });

  const queryClient = useQueryClient();
  const mutation = useMutation(updateCar, {
    onSuccess: () => queryClient.invalidateQueries(["cars"]),
  });

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    mutation.mutate({
      car: {
        brand: car.brand,
        model: car.model,
        year: Number(car.year),
      },
      url: `${import.meta.env.VITE_API_URL}/api/cars/${cardata.id}`,
    });
    setOpen(false);
  };

  const handleOpen = () => {
    setCar({
      brand: cardata.brand,
      model: cardata.model,
      year: cardata.year,
    });
    setOpen(true);
  };

  return (
    <>
      <IconButton aria-label="edit" size="small" onClick={handleOpen}>
        <EditIcon fontSize="small" />
      </IconButton>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Car</DialogTitle>

        <CarDialogContent car={car} handleChange={handleChange} />

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditCar;
