import React from "react";
import GoogleMapReact from "google-map-react";
import {
  Paper,
  StepButton,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Rating } from "@material-ui/lab";

import makeStyles from "./style.js";

const Map = ({ setCoordinates, coordinates, setBounds, places, setChildClicked }) => {
  const classes = makeStyles();
  const isDesktop = useMediaQuery("(min-width:600px)");

 
  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDdZPdwTSaQYdSCs1fMG51lp0A4aQPW10U" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          console.log(e);
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child)=>setChildClicked(child)}
      >
        {places?.map((place, index) => (
          <div
            className={classes.markerContainer}
            key={index}
            lng=  {Number(place.longitude)}
            lat={Number(place.latitude)}
          >
            {!isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
              <Paper elevation={3} className={classes.paper}>
                <Typography
                  className={classes.typography}
                  variant="subtitle2"
                  gutterBottom
                >
                  {" "}
                  {place.name}
                </Typography>
                <img
                  alt=""
                  className={classes.pointer}
                  src={
                    place.photo
                      ? place.photo.images.large.url
                      : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                  }
                />
                <Rating
                  name="read-only"
                  size="small"
                  value={Number(place.rating)}
                  readOnly
                />
              </Paper>
            )}
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
