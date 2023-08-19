import axios from "axios";

const URL =
  "https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary";

export const getPlaceData = async (type, sw, ne) => {
  try {
    const {
      data: { data }
    } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
      params: {
        bl_latitude: sw.lat,
        bl_longitude: sw.lng,
        tr_longitude: ne.lng,
        tr_latitude: ne.lat,
      },
      headers: {
        "X-RapidAPI-Key": "a826895f39msh1a9fd7c8a9825eap15c090jsna16e8ff392ba",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
