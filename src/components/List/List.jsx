import React, { createRef, useEffect, useState } from "react";
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

const List = ({
  places,
  childClicked,
  isLoading,
  type,
  rating,
  setType,
  setRating,
}) => {
  const classes = makeStyles();

  //   the state that store all the Element references
  const [elRefs, setElRefs] = useState([]);
  // How do we make our list scroll to a specific element on the list when we clicked on the map we would use react REF for this
  useEffect(() => {
    setElRefs((refs) =>
      Array(places?.length)
        .fill()
        .map((_, i) => elRefs[i] || createRef())
    );
  }, [places]);

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Resturants, Hotels & Attractions around you{" "}
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size="5rem" />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="type">Type</InputLabel>
            <Select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel id="rating">Rating</InputLabel>
            <Select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="3">Above 3.0</MenuItem>
              <MenuItem value="4">Above 4.0</MenuItem>
              <MenuItem value="4.5">Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places?.map((place, i) => (
              <Grid ref={elRefs[i]} key={i} item xs={12}>
                <PlaceDetails
                  selected={Number(childClicked) === i}
                  refProp={elRefs[i]}
                  place={place}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
