import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [modal, ToggleModal] = useState(false);
  const submit = (e) => {
    const newItem = {
      name: name,
    };
    e.preventDefault();
    axios
      .post("/api/items", newItem)
      .then((res) => dispatch({ type: "ADD_ITEM", data: res.data }));
    ToggleModal(!modal);
  };
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
};

export default ItemModal;
