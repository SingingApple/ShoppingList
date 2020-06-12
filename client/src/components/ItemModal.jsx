import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { returnErrors } from "../actions/errorActions";
import {
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
const ItemModal = () => {
  const token = useSelector((state) => state.auth.token);
  const tokenConfig = (token) => {
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
  const [name, setName] = useState("");
  const [modal, ToggleModal] = useState(false);
  const submit = (e) => {
    const newItem = {
      name: name,
    };
    e.preventDefault();
    axios
      .post("/api/items", newItem, tokenConfig(token))
      .then((res) => {
        setName("");
        dispatch({ type: "ADD_ITEM", data: res.data });
      })
      .catch((err) => {
        dispatch(returnErrors(err.response.data, err.response.status));
      });
  };

  if (token) {
    return (
      <div>
        <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={() => ToggleModal(!modal)}
        >
          Add an Item
        </Button>

        <Modal isOpen={modal} toggle={() => ToggleModal(!modal)}>
          <ModalHeader toggle={() => ToggleModal(!modal)}>
            Add an item
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={submit}>
              <FormGroup>
                <Label for="item">Item</Label>
                <Input
                  type="text"
                  name="name"
                  id="item"
                  placeholder="Add an Item"
                  onChange={(e) => setName(e.target.value)}
                ></Input>
                <Button
                  type="submit"
                  color="dark"
                  style={{ marginTop: "2rem", width: "100%" }}
                >
                  Add Item
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  } else {
    return null;
  }
};

export default ItemModal;
