import { v4 as uuidv4 } from "uuid";
export const initState = {
  items: [
    { id: uuidv4(), name: "Eggs" },
    { id: uuidv4(), name: "Milk" },
    { id: uuidv4(), name: "Chicken" },
    { id: uuidv4(), name: "Mutton" },
  ],
};
const itemReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ITEMS":
      return {
        ...state,
      };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
      };

    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, { id: uuidv4(), name: action.item }],
      };
    default:
      return state;
  }
};
export default itemReducer;
