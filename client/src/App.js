import React from "react";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useDispatch } from "react-redux";
import { Container } from "reactstrap";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
import axios from "axios";
import { returnErrors } from "./actions/errorActions";
import { useSelector } from "react-redux";
const App = () => {
  const token = useSelector((state) => state.auth.token);
  const tokenConfig = () => {
    dispatch({ type: "USER_LOADING" });
    //GET TOKEN FROM LOCAL STORAGE

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  };
  const dispatch = useDispatch();

  const loadUser = () => {
    axios
      .get("/api/auth/user", tokenConfig(token))
      .then((res) => {
        dispatch({ type: "USER_LOADED", payload: res.data });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
        // console.log(returnErrors(err.response.data.msg, err.response.status));
        dispatch({ type: "AUTH_ERROR" });
      });
  };

  useEffect(() => {
    loadUser();
    console.log("user");
  }, []);
  return (
    <div className="App">
      <AppNavbar></AppNavbar>
      <Container>
        <ItemModal></ItemModal>
        <ShoppingList></ShoppingList>
      </Container>
    </div>
  );
};

export default App;
