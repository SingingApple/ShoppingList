import React, { useEffect, useState } from "react";
import axios from "axios";
import { returnErrors } from "../../actions/errorActions";
import { register } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import {
  NavLink,
  Modal,
  Button,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Nav,
  Alert,
} from "reactstrap";
const RegisterModal = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [modal, ToggleModal] = useState(false);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (error.id === "REGISTER_FAIL") {
      setMsg(error.msg.msg);
      console.log(msg);
    } else {
      setMsg(null);
    }
    if (modal) {
      if (auth.isAuthenticated) {
        ToggleModal(!modal);
      }
    }
  }, [error]);
  const submit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    const { body, config } = register(newUser);
    axios
      .post("/api/users", body, config)
      .then((res) => {
        dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
        );
        dispatch({ type: "REGISTER_FAIL" });
      });
    if (error.id === "REGISTER_FAIL") {
      ToggleModal(!modal);
    }
    setEmail("");
    setPassword("");
    setName("");
  };
  return (
    <div>
      <NavLink onClick={() => ToggleModal(!modal)}>Register</NavLink>
      <Modal isOpen={modal} toggle={() => ToggleModal(!modal)}>
        <ModalHeader
          toggle={() => {
            ToggleModal(!modal);
            dispatch({ type: "CLEAR_ERRORS" });
          }}
        >
          Register
        </ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={submit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              ></Input>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              ></Input>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              ></Input>
              <Button
                type="submit"
                color="dark"
                style={{ marginTop: "2rem", width: "100%" }}
              >
                Sign Up
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default RegisterModal;
