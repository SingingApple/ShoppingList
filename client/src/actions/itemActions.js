export const getItems = () => {
  return {
    type: "GET_ITEMS",
  };
};

export const deleteItem = (id) => {
  return {
    type: "DELETE_ITEM",
    payload: id,
  };
};
