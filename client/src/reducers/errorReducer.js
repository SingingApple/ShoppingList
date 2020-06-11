const initState = {
  msg: {},
  status: null,
  id: null,
};
const errorReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ERRORS":
      return {
        msg: action.payload.msg,
        id: action.payload.id,
        status: action.payload.status,
      };

    case "CLEAR_ERRORS":
      return {
        msg: {},
        status: null,
        id: null,
      };
    default:
      return {
        ...state,
      };
  }
};
export default errorReducer;