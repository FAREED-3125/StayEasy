import React, { useEffect, useState } from "react";
import axios from "axios";
export const URL_fetch = "https://stayeasyapp.onrender.com/api"

export const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, seterr] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${URL_fetch}/${url}`);
        setData(response.data)
      } catch (err) {
        seterr(err);
      } finally {
        setLoading(false);
      }
    };
   fetchData();
  }, [url]);
  const reFetch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (!response.ok) throw Error(response.error);
      setData(response.data);
    } catch (err) {
      seterr(err);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, err };
};
