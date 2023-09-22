
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
import Guestrooms2 from "./Guestrooms2";
import { useNavigate } from "react-router-dom";
import { BookContextProvider } from "../../Context/FormContext";
export const filterFormcontext2 = createContext();
const Filter2 = ({edit,setEdit,state,setState}) => {
const {bookInfo,dispatch} = useContext(BookContextProvider)
  const [rooms, setRooms] = useState(0);
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [guest, setGuest] = useState(0);
  const [openrg, setOpenrg] = useState(false);
  const [City, setcity] = useState("");
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), b 7),
      key: "selection",
    },
  ]);

  const refOne = useRef();
  const refOne2 = useRef();
  const [open,setOpen] = useState(false);
  const navigate = useNavigate()
 
  useEffect(() => {
    // event listeners
    setcity(state.city);
    setRooms(Number(state.rooms));
    setAdults(Number(state.adult));
    setChildren(Number(state.child));
    setGuest(Number(state.guest));
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
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
         height: !edit && "0",
         overflow: "hidden",
         minHeight: !edit && "0",
          transition: "all .3s ease-in"
        }}
      >
        <div className="filter-btn">
          <button className="btn" onClick={() => setEdit((ps) => !ps)}>
            close
          </button>
        </div>
        <div
          className="book-form"
         
        >
         
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
                <p>{format(range[0].startDate, "yyyy/MM/dd")}</p>
              </div>
              <div>
                <p>to</p>
              </div>
              <div className="to">
                <p>{format(range[0].endDate, "yyyy/MM/dd")}</p>
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
              value={`${format(range[0].endDate,"yyyy/MM/dd")}`}
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
            <filterFormcontext2.Provider value={{
              openrg,setRooms,rooms,setChildren,children,setGuest,adults,setAdults,setOpenrg,form2Reset
            }}>
              <Guestrooms2/>
            </filterFormcontext2.Provider>
            </div>
          </div>
        
          <div  className="search-btn">
            <input type="submit"   onClick={() => {
          setState( {id: state.id,from:format(range[0].startDate, "yyyy/MM/dd")|| "--/--/----",to: format(range[0].endDate, "yyyy/MM/dd")|| '--/--/---',city: City,adult: adults,child: children,rooms: rooms,guest: guest})
           setEdit(false);
          }
           } value='submit'/></div>
        
        </div>
      </div>
    </>
  );
}

export default Filter2