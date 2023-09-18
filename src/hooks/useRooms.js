import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL_fetch } from "./useFetch";

export const useRooms = (body) => {
  const [rdata, setData] = useState([]);
  const [rloading, setLoading] = useState(false);
  const [rerr, seterr] = useState(null);
 
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
if(body){
  try {
    const response = await axios.post(`${URL_fetch}/Rooms/FindRooms`,body);
    setData(response.data)
  } catch (err) {
    seterr(err);
    console.log(err);
  } finally {
    setLoading(false);
  }

}
    };
   fetchData();
  }, [body]);
  const reFetch = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${URL_fetch}/Rooms/FindRooms`,body);
      if (!response.ok) throw Error(response.error);
      setData(response.data);
    } catch (err) {
      seterr(err);
    } finally {
      setLoading(false);
    }
  };
  return { rdata, rloading, rerr };
};
