import { combineReducers } from "redux";
import sessionReducer from "./session";
import userReducer from "./user";
import messageReducer from "./message";
import roomReducer from "./room";

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  messageState: messageReducer,
  roomState: roomReducer,
});

export default rootReducer;
