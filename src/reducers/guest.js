const INITIAL_STATE = {
  guest: null,
};

const applySetGuests = (state, action) => ({
  ...state,
  guests: action.guests,
});

function guestReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "GUESTS_SET": {
      return applySetGuests(state, action);
    }
    default:
      return state;
  }
}

export default guestReducer;
