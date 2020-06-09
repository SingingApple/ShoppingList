import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch } from "react-redux";

const ShoppingList = () => {
  const items = useSelector((state) => {
    return state.item.items;
  });

  const dispatch = useDispatch();

  console.log(items);

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map((item) => {
            return (
              <CSSTransition key={item.id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() =>
                      dispatch({ type: "DELETE_ITEM", id: item.id })
                    }
                  >
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
