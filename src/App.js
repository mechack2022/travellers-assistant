import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlaceData } from "./api";
import Header from "./components/Header/Header";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [bounds, setBounds] = useState({});
  const [coordinates, setCoordinates] = useState();

//   get user location on load 
useEffect(() =>{
  navigator.geolocation.getCurrentPosition((e ) => {
    setCoordinates({lat: e.coords.latitude, lng:e.coords.longitude})
  } )
}, []);

  useEffect(() => {
    console.log(coordinates, bounds)
    getPlaceData(bounds.sw, bounds.ne).then((data) => {
      console.log(data);
      setPlaces(data);
    }); 
  }, [coordinates, bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List

          // isLoading={isLoading}
          // childClicked={childClicked}
          places={places}
          // type={type}
          // setType={setType}
          // rating={rating}
          // setRating={setRating}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Map
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default App;
