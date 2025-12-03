import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCars, deleteCar } from "../api/carapi";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

function CarList() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars,
  });

  const mutation = useMutation(deleteCar, {
    onSuccess: () => {
      queryClient.invalidateQueries(["cars"]);
      setOpen(true);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading cars</p>;

  return (
    <>
      <AddCar />

      <table
        style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Brand</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Model</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Year</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Edit</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {data.map((car) => (
            <tr key={car.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {car.brand}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {car.model}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {car.year}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <EditCar cardata={car} />
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() =>
                    window.confirm("Delete this car?") &&
                    mutation.mutate(car.id)
                  }
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        message="Car deleted"
      />
    </>
  );
}

export default CarList;
