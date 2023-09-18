import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL_fetch } from "./useFetch";


export const useReviews = (body,limit = 0) => {
  const [r1data, setData] = useState([]);
  const [r1loading, setLoading] = useState(false);
  const [r1err, seterr] = useState(null);

  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.post(`${URL_fetch}/Review/ManyReviews?limit=${limit}`,body);
       
        setData(response.data)
      } catch (err) {
        seterr(err);
      } finally {
        setLoading(false);
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
  return { r1data, r1loading, r1err };
};


export const createReview = async (body,id) => {
  try{
    const review = await axios.post(`${URL_fetch}/Review/CreateReview/${id}`,body);
    return review;
  }catch(err){
    console.log(err);
  }
}