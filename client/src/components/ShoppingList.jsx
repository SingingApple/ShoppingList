import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useDispatch } from "react-redux";
import axios from "axios";
const ShoppingList = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   axios.get("/api/items").then((res) => {
  //     console.log(res.data);
  //     dispatch({ type: "GET_ITEMS", data: res.data });
  //   });
  // });
  useEffect(() => {
    Promise.resolve(dispatch({ type: "ITEMS_LOADING" })).then(() => {
      axios.get("/api/items").then((res) => {
        console.log(res.data);
        dispatch({ type: "GET_ITEMS", data: res.data });
      });
    });
  }, []);

  const items = useSelector((state) => {
    return state.item.items;
  });
  console.log(items);
  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map((item) => {
            return (
              <CSSTransition key={item._id} timeout={500} classNames="fade">
                <ListGroupItem>
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => {
                      axios.delete(`/api/items/${item._id}`).then((res) => {
                        console.log(res);
                        dispatch({ type: "DELETE_ITEM", id: item._id });
                      });
                    }}
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
