import { combineReducers } from "redux";
import sessionReducer from "./session";
import userReducer from "./user";
import messageReducer from "./message";
import roomReducer from "./room";
import guestReducer from "./guest";

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  messageState: messageReducer,
  roomState: roomReducer,
  guestState: guestReducer,
});

export default rootReducer;
