const INITIAL_STATE = {
  rooms: 1,
};

const applySetRooms = (state, action) => ({
  ...state,
  rooms: action.rooms,
});

function roomReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ROOMS_SET": {
      return applySetRooms(state, action);
    }
    default:
      return state;
  }
}

export default roomReducer;
