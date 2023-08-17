import React from "react";
import GoogleMapReact from "google-map-react";
import {
  Paper,
  StepButton,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";

import makeStyles from "./style.js";

const Map = ({ setCoordinates, coordinates, setBounds }) => {
  const classes = makeStyles();
  const isMobile = useMediaQuery("(min-width:600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDdZPdwTSaQYdSCs1fMG51lp0A4aQPW10U" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChildClick={""}
        onChange={(e) => {
            console.log(e)
            setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
