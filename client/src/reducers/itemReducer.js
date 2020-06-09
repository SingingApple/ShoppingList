import { v4 as uuidv4 } from "uuid";
export const initState = {
  items: [],
  loading: false,
};
const itemReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ITEMS":
      return {
        ...state,
        items: action.data,
        loading: false,
      };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item._id !== action.id),
      };

    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.data],
      };
    case "ITEMS_LOADING":
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};
export default itemReducer;
