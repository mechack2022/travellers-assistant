import React, { useState } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import makeStyles from "./style.js";
import PlaceDetails from "../PlaceDetails/PlaceDetails.jsx";

const List = ({places}) => {
  const classes = makeStyles();
  const [type, setType] = useState("resturants");
  const [rating, setRating] = useState("");

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Resturants, Hotels & Attractions around you{" "}
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select onChange={(e) => setType(e.target.value)} value={type}>
          <MenuItem value="resturants">Resturants</MenuItem>
          <MenuItem value="hotels">Resturants</MenuItem>
          <MenuItem value="attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select onChange={(e) => setType(e.target.value)} value={rating}>
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={3}>Above 3.5</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places?.map((place, i) => (
          <Grid key={i} item xs={12}>
            <PlaceDetails place={place} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default List;
