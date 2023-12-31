import React, {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import "./hotel3.css";
import "./hot4.css";
import { MdOutlineAirlineSeatIndividualSuite } from "react-icons/md";
import { GrCheckboxSelected } from "react-icons/gr";
import { BookContextProvider, FormOpt } from "../../../Context/FormContext";

const RoomsHot = ({ resData, dataOffer }) => {
  const { bookInfo, dispatch } = useContext(BookContextProvider);
  const [selrooms, setselrooms] = useState(-1);
  const [roomnos, setroomnos] = useState([]);
  useEffect(() => {
    if (bookInfo.rooms == roomnos.length) {
      dispatch({
        type: FormOpt.UPDATE_SEARCH,
        payload: { roomnumber: roomnos },
      });
    }

    console.log(roomnos)
  }, [roomnos]);

  const roomaddfunc = (number) => {
    if (roomnos.includes(number)) {
      undoRoomnumfunc(number);
    } else {
      setroomnos([...roomnos, number]);
    }
  };

  const undoRoomnumfunc = (number) => {
    const newRoomnos = roomnos.filter((r) => r !== number);
    setroomnos(newRoomnos);
  };
  console.log(roomnos);
  return (
    <div className="room-container">
      <div className="ro-head">
        <h4>Room Selection</h4>
      </div>
      {resData ? (
        <div className="room-cont">
          {resData.map((room, indexroom) => (
            <div
              className="room-de"
              style={{
                transition: "all .3s ease-in",
              }}
              key={room._id}
            >
              <div className="room-img">
                {room?.photos.map((img, index1) => (
                  <img src={img} key={index1} alt="roomsImage" />
                ))}
              </div>
              <div className="room-de2">
                <div className="room-de-1">
                  <p>{room.type}</p>
                  <p>
                    Price: ₹
                    <span>
                      {Math.round(room.price - (room.price * dataOffer) / 100)}
                    </span>{" "}
                    <span>{room.price}</span>{" "}
                  </p>
                </div>
                <div className="ro-des">{room.desc}</div>

                <div
                  className="ro-btn btn btn-primary"
                  style={{
                    width: selrooms === indexroom && "70px",
                    padding: selrooms === indexroom && ".2rem .5rem",
                    transition: "all .2s ease-in-out",
                  }}
                  onClick={() => {
                    setselrooms((ps) => {
                      if (ps === indexroom) return -1;
                      else return indexroom;
                    });
                  }}
                >
                  {selrooms === indexroom ? "close" : "Show rooms"}
                </div>

                {selrooms === indexroom && (
                  <div className="rooms-number-cont">
                    {resData.map((room1) =>
                      room1.Room_number.map((room, index) => (
                        <div className="ro-num-cont" key={index}>
                          <div className="ro-number">
                            <span>Room no: </span>
                            <span>{room.number}</span>
                          </div>
                          {bookInfo?.betDates.includes(...room.unavailable) ? (
                            <div className="btn btn-unavailable">
                              <span>unavailable</span>{" "}
                              <span>on select dates</span>
                            </div>
                          ) : (
                            <div
                              className="btn btn-select"
                              onClick={() => {
                                if (bookInfo.rooms > roomnos.length) {
                                  roomaddfunc(room.number);
                                }
                              }}
                            >
                              {roomnos.includes(room.number) ? (
                                <GrCheckboxSelected />
                              ) : (
                                <MdOutlineAirlineSeatIndividualSuite />
                              )}
                            </div>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="ro-head">
            <h4>No Rooms Found</h4>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomsHot;
