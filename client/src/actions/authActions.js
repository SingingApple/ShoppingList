export const register = ({ name, email, password }) => {
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };
  const body = JSON.stringify({ name, email, password });
  return {
    config,
    body,
  };
};
export const logout = () => {
  return {
    type: "LOGOUT_SUCCESS",
  };
};
