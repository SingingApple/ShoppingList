import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "reactstrap";
import AppNavbar from "./components/AppNavbar";
import ShoppingList from "./components/ShoppingList";
import ItemModal from "./components/ItemModal";
const App = () => {
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
