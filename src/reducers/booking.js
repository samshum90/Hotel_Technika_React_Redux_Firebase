const INITIAL_STATE = {
  bookings: null,
};

const applySetBookings = (state, action) => ({
  ...state,
  bookings: action.bookings,
});

function bookingReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "BOOKINGS_SET": {
      return applySetBookings(state, action);
    }
    default:
      return state;
  }
}

export default bookingReducer;
