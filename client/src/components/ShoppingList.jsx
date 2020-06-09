import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import { getItems } from "../actions/itemActions";
import itemReducer from "../reducers/itemReducer";
const ShoppingList = () => {
  const items = useSelector((state) => {
    return state.item.items;
  });
  console.log(items);
  useEffect(() => {
    console.log(items);
  });
  return (
    <Container>
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={() => {
          const name = prompt("Enter Item");
        }}
      >
        Add item
      </Button>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map((item) => {
            return (
              <CSSTransition key={item.id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button className="remove-btn" color="danger" size="sm">
                    &times;
                  </Button>
                  {item.name}
                </ListGroupItem>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;
