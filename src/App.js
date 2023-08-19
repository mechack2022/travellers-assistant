import React, { useEffect, useState } from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlaceData } from "./api";
import Header from "./components/Header/Header";

const App = () => {
  const [isLoading, setIsloading] = useState(false);
  const [places, setPlaces] = useState([]);

  const [bounds, setBounds] = useState({});
  const [coordinates, setCoordinates] = useState();
  const [childClicked, setChildClicked] = useState(null);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");
  const [filterPlaces, setFilterPlaces] = useState([]);

  const [autoComplete, setAutocomplete] = useState(null);

  //   get user location on load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((e) => {
      setCoordinates({ lat: e.coords.latitude, lng: e.coords.longitude });
    });
  }, []);

  useEffect(() => {
    setIsloading(true);
    console.log(coordinates, bounds);
    getPlaceData(type, bounds.sw, bounds.ne).then((data) => {
      console.log(data);
      setPlaces(data);
      setFilterPlaces([]);
      setIsloading(false);
    });
  }, [type, coordinates, bounds]);

  useEffect(() => {
    const filterPlaces = places?.filter(
      (place) => Number(place.rating) > rating
    );
    setFilterPlaces(filterPlaces);
  }, [rating, places]);

  const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.location.lat();
    const lng = autoComplete.getPlace().geometry.location.lng();

    setCoordinates({ lat, lng });
  };

  return (
    <>
      <CssBaseline />
      <Header onLoad={onLoad} onPlaceChanged={onPlaceChanged} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            isLoading={isLoading}
            childClicked={childClicked}
            places={filterPlaces?.length ? filterPlaces : places}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
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
            places={filterPlaces?.length ? filterPlaces : places}
            setChildClicked={setChildClicked}
          />
        </Grid>
      </Grid>
    </>
  );
};
export default App;
