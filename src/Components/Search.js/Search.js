// IMPORT SECTION

import React, { createContext, useState, useEffect, useRef, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";
import { url } from "../..";
import { useFetch } from "../../hooks/useFetch";
import "./search.css";
import Loading from "../Loading/Loading";
import SearchBox from "./SearchBox";
import Filter from "../Filter/Filter";
import TopSearch from "../Filter/TopSearch";
import BookForm from "../BookForm/BookForm";
import Header from "../Header/Header";
import Mobilenva from "../MobileNAvbar/Mobilenva";
import { BookContextProvider, FormOpt } from "../../Context/FormContext";
export const searchContext = createContext();

// =======================================================================================


const Search = () => {
  const {bookInfo,dispatch} = useContext(BookContextProvider);
  // const location = useLocation();
  // const guest1 = URLFetchFunc().get("guest");
  // const rooms1 = URLFetchFunc().get("rooms");
  // const city = URLFetchFunc().get("city");
  // const adult1 = URLFetchFunc().get("adults");
  // const child1 = URLFetchFunc().get("children");
  // const from = URLFetchFunc().get("fromdate");
  // const to = URLFetchFunc().get("todate");
  // const min1 = URLFetchFunc().get("min");
  // const max1 = URLFetchFunc().get("max");

  const location = useLocation();
  const guest1 = bookInfo?.guest
  const rooms1 = bookInfo?.rooms
  const city = URLFetchFunc().get("city");
  const adult1 = bookInfo?.adults;
  const child1 = bookInfo?.children
  const from = bookInfo?.from
  const to = bookInfo?.to
  const min1 = URLFetchFunc().get("min");
  const max1 = URLFetchFunc().get("max");


  function URLFetchFunc () {
    return new URLSearchParams(location.search)
  }
  const { data, loading, err } = useFetch(
    `Hotels/search?city=${city?.toLowerCase()}${
      from ? `&fromdate=${from}` : ""
    }${to ? `&todate=${to}` : ""}${guest1 ? `&guest=${guest1}` : ""}${
      adult1 ? `&adult=${adult1}` : ""
    }${child1 ? `&children=${child1}` : ""}${min1 ? `&min=${min1}` : ""}${
      max1 ? `&max=${max1}` : ""
    }${rooms1 ? `&rooms=${rooms1}` : ""}`
  );

  useEffect(()=> {
       dispatch({type: FormOpt.UPDATE_SEARCH,payload: {city: [city]}});
  },[city])

  const [edit, setEdit] = useState(false);
  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);
  const refOne2 = useRef(null);

  return (
    <> <div className="search-container0">
      <Header />
      <div className="search-container">
        {loading ? (
          <Loading
            width={"15px"}
            height={"15px"}
            width2={"100vw"}
            height2={"100dvh"}
          />
        ) : data.length > 0 && data ? (
          <>
            <searchContext.Provider
              value={{
                from,to,city,adult1,child1,rooms1,guest1,edit,setEdit,refOne,refOne2,open, setOpen,min1,max1,
              }}
            >
              <TopSearch /> <Filter />
              <div className="search-con">
                <SearchBox data={data} />
              </div>
              {edit && <Filter />}
            </searchContext.Provider>
          </>
        ) : (
          <div className="search-any">
            <BiErrorCircle/>
           <p>No searches</p> 
          </div>
        )}
      </div>  <Mobilenva/>
    </div>
  
   </>
  );
};

export default Search;
