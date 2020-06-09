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
    default:
      return state;
  }
};
export default itemReducer;
