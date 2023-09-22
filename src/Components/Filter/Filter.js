// IMPORT SECTION
import React, {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
} from "react";
import DateRangeComp from "../BookForm/DateRangeComp";
import "./filter.css";
import format from "date-fns/format";
import { addDays } from "date-fns";
import { searchContext } from "../Search.js/Search";
import Minmax from "./Minmax";
import Guestrooms from "./Guestrooms";
import { BookContextProvider, FormOpt } from "../../Context/FormContext";
export const filterFormcontext = createContext();

// =======================================================================================
const Filter = () => {
  const {bookInfo,dispatch} = useContext(BookContextProvider)

  const [rooms, setRooms] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [guest, setGuest] = useState(0);
  const [openrg, setOpenrg] = useState(false);
  const [City, setcity] = useState("");
  const [range, setRange] = useState([
    {
      startDate: new Date((bookInfo?.from) && bookInfo?.from),
      endDate: addDays(new Date((bookInfo?.from) && bookInfo?.from), bookInfo?.days || 7),
      key: "selection",
    },
  ]);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(3000);
  const refOne = useRef();
  const refOne2 = useRef();
  const { setOpen, setEdit, edit, city, rooms1, guest1, child1, adult1, open } =
    useContext(searchContext);

    function getDayDifference(startDate, endDate) {
      // Create Date objects from the input strings
      const date1 = new Date(startDate);
      const date2 = new Date(endDate);
    
      // Calculate the difference in milliseconds
      const differenceInMilliseconds = date2 - date1;
    
      // Convert milliseconds to days
      const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
    
      return Math.abs(Math.round(differenceInDays)); // Use Math.abs to ensure a positive result
    }
  useEffect(() => {
    // event listeners
    const dayDifference = getDayDifference(bookInfo?.from, bookInfo?.to);
    setcity(city);
    setRooms(Number(rooms1));
    setAdults(Number(adult1));
    setChildren(Number(child1));
    setGuest(Number(guest1));
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
    dispatch({type: FormOpt.UPDATE_SEARCH,payload: {days: dayDifference}});
  }, []);

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
    <>
      <div
        className="filter-container"
        style={{
          transform: edit && "translateY(0)",
          transition: "all .3s ease-in"
        }}
      >
        <div className="filter-btn">
          <button className="btn" onClick={() => setEdit((ps) => !ps)}>
            close
          </button>
        </div>
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
              className="input"
              name="city"
              required
              style={{
                color: "var(--g-color)",
              }}
              value={City}
              onChange={(e) => setcity(e.target.value)}
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
                <p>{format(range[0].startDate,"dd/MM/yyyy")}</p>
              </div>
              <div>
                <p>to</p>
              </div>
              <div className="to">
                <p>{format(range[0].endDate,"dd/MM/yyyy")}</p>
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
            />
          </label>
          {open && (
            <>
              <div className="date-btn">
                <button className="btn" onClick={() => setOpen((ps) => !ps)}>
                  X
                </button>
              </div>
              <DateRangeComp range={range} setRange={setRange} open={open} />
            </>
          )}

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
                  <span>Rooms: </span>
                  <span
                    style={{
                      color: "var(--g-color)",
                    }}
                  >
                    {rooms || 0}
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
                  <span>Guests:</span>{" "}
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
            <filterFormcontext.Provider value={{
              openrg,setRooms,rooms,setChildren,children,setGuest,adults,setAdults,setOpenrg,form2Reset
            }}>
              <Guestrooms/>
            </filterFormcontext.Provider>
            </div>
          </div>
          <Minmax min={min} max={max} setMax={setMax} setMin={setMin} />
          <div className="search-btn">
            <input type="submit" style={{}} value="Search" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Filter;
