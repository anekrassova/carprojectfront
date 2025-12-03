import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCar } from "../api/carapi";
import CarDialogContent from "./CarDialogContent";

function AddCar() {
  const [open, setOpen] = useState(false);
  const [car, setCar] = useState({ brand: "", model: "", year: "" });

  const queryClient = useQueryClient();
  const mutation = useMutation(addCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
    },
  });

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    mutation.mutate({
      brand: car.brand,
      model: car.model,
      year: Number(car.year),
    });
    setOpen(false);
    setCar({ brand: "", model: "", year: "" });
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        New Car
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add New Car</DialogTitle>

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

export default AddCar;
