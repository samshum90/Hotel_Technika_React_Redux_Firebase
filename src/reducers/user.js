const INITIAL_STATE = {
  user: null,
};

const applySetUsers = (state, action) => ({
  ...state,
  users: action.users,
});

const applySetUser = (state, action) => ({
  ...state,
  users: {
    ...state.users,
    [action.uid]: action.user,
  },
});

function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "USERS_SET": {
      return applySetUsers(state, action);
    }
    case "USERS_SET": {
      return applySetUser(state, action);
    }
    default:
      return state;
  }
}

export default userReducer;
