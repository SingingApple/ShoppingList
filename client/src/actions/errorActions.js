export const returnErrors = (msg, status, id = null) => {
  // return {
  //   type: "GET_ERRRORS",
  //   payload: { msg: msg.msg, status, id },
  // };
  return {
    type: "GET_ERRORS",
    payload: { msg, status, id },
  };
};

export const clearErrors = () => {
  return {
    type: "CLEAR_ERROS",
  };
};
