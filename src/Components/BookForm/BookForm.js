// IMPORT SECTION
import React, { useEffect, useState, useRef, createContext, useContext } from "react";
import "./bookform.css";
import DateRangeComp from "./DateRangeComp";
import "./bookform.css";
import format from "date-fns/format";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Guestrooms from "./Guestrooms";
import { BookContextProvider, FormOpt } from "../../Context/FormContext";
export const BookFormContext = createContext();
// =======================================================================================

const BookForm = ({ width }) => {
  const {bookInfo,dispatch} = useContext(BookContextProvider);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guest, setGuest] = useState(2);
  const [openrg, setOpenrg] = useState(false);
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  console.log(bookInfo)
  const [city,setCity] = useState("")

  const reopen = useRef();
  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);
  const refOne2 = useRef(null);
  
  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  useEffect(()=>{
     if(rooms > (guest / 2)) setRooms(rooms)
     else setRooms(Math.ceil(guest/2));
  },[guest])

  useEffect(()=> {
    if(rooms < Math.ceil(guest/2))
    {
      setRooms(Math.ceil(guest/2));

    }
  },[rooms])

  // hide dropdown on ESC press
  const hideOnEscape = (e) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide on outside click
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
    if (refOne2.current && !refOne2.current.contains(e.target)) {
      setOpenrg(false);
    }
    if (reopen.current && !reopen.current.contains(e.target)) {
      setOpenrg(false);
    }
  };

  const form2Reset = () => {
    setRooms(0);
    setAdults(0);
    setChildren(0);
    setGuest(0);
  };
  useEffect(() => {
    setGuest(adults + children);
  }, [adults, children]);
  return (
    <div className="bookform-container" style={{}}>
      <form
        className="book-form"
        action="/search"
        method="GET"
        onSubmit={(e) => {
          
          dispatch(
            {type: FormOpt.UPDATE_SEARCH,payload: {
              city: [city],rooms,adults,guest,from: format(range[0].startDate, "yyyy/MM/dd"),to:format(range[0].endDate, "yyyy/MM/dd"),children
            }}
          )
        }}
      >
        <label htmlFor="city">
          <span>Destination:</span>
          <input
            type="text"
            className="input city"
            name="city"
            required
            style={{
              color: "var(--g-color)",
            }}
            
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label htmlFor="date">
          <span>Date</span>
          <div
            className="input"
            style={{
              height: " 3rem",
              color: "var(--g-color)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              fontSize: "14px",
            }}
           
            onClick={() => setOpen((open) => !open)}
          >
            <div className="fromdate">
              <p>{format(range[0].startDate, "dd/MM/yyyy")}</p>
            </div>
            <div>
              <p>to</p>
            </div>
            <div className="to">
              <p>{format(range[0].endDate, "dd/MM/yyyy")}</p>
            </div>
          </div>
          <input
            type="hidden"
            name="fromdate"
            value={format(range[0].startDate, "yyyy/MM/dd")}
          />
          <input
            type="hidden"
            name="todate"
            value={`${format(range[0].endDate, "yyyy/MM/dd")}`}
          />{" "}
          {open && (
            <div ref={refOne}>
              <div className="date-btn">
                <button className="btn" onClick={() => setOpen((ps) => !ps)}>
                  X
                </button>
              </div>
              <DateRangeComp range={range} setRange={setRange} open={open} />
            </div>
          )}
        </label>

        <div>
          <label
            htmlFor="rooms&Guests"
            className="roomsGuests"
            onClick={() => {
              setOpenrg((ps) => !ps);
            }}
          >
            <span>Rooms & Guests</span>
            <div className="randg">
              <h4>
                <span >Rooms: </span>
                <span
                  style={{
                    color: "var(--g-color)",
                  }}
                >
                  {rooms}
                </span>
              </h4>
              <div
                className="line"
                style={{
                  width: "2px",
                  height: "30px ",
                  backgroundColor: "var(--g-color)",
                  borderRadius: "10px",
                }}
              ></div>
              <h4>
                <span >Guests:</span>{" "}
                <span
                  style={{
                    color: "var(--g-color)",
                  }}
                >
                  {guest}
                </span>
              </h4>
            </div>
            <p
              align="center"
              style={{
                color: "var(--g-color)",
              }}
            >
              Total: {adults} adults & {children} childrens
            </p>
            <input type="hidden" value={guest} name="guest" />
            <input type="hidden" value={children} name="children" />
            <input type="hidden" value={adults} name="adults" />
            <input type="hidden" value={rooms} name="rooms" />
          </label>{" "}
          <div className="relative" ref={refOne2}>
            <BookFormContext.Provider value={{
              openrg,setRooms,rooms,setChildren,children,setGuest,adults,setAdults,setOpenrg,form2Reset
            }}>
              <Guestrooms/>
          </BookFormContext.Provider>
          </div>
        </div>
        <div className=" search-btn">
          <input type="submit" value="Search" />
        </div>
      </form>
    </div>
  );
};

export default BookForm;
