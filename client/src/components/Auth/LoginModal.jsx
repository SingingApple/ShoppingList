import React, { useEffect, useState } from "react";
import axios from "axios";
import { returnErrors } from "../../actions/errorActions";
import { login } from "../../actions/authActions";
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
const LoginModal = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);
  const [modal, ToggleModal] = useState(false);
  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    if (error.id === "LOGIN_FAIL") {
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
      email,
      password,
    };
    const { body, config } = login(newUser);
    axios
      .post("/api/auth", body, config)
      .then((res) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch(
          returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
        );
        dispatch({ type: "LOGIN_FAIL" });
      });
    if (error.id === "REGISTER_FAIL") {
      ToggleModal(!modal);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <NavLink onClick={() => ToggleModal(!modal)}>LOGIN</NavLink>
      <Modal isOpen={modal} toggle={() => ToggleModal(!modal)}>
        <ModalHeader
          toggle={() => {
            ToggleModal(!modal);
            dispatch({ type: "CLEAR_ERRORS" });
          }}
        >
          LOGIN
        </ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={submit}>
            <FormGroup>
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
                Sign In
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
