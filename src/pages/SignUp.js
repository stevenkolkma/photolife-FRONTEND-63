import styled from "styled-components";
import { Button, Input, Title } from "../styled";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signUp } from "../store/user/thunks";
import { selectToken } from "../store/user/selectors";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector(selectToken);

  useEffect(() => {
    if (token !== null) {
      navigate("/");
    }
  }, [token, navigate]);

  const submitForm = (e) => {
    e.preventDefault();
    dispatch(signUp(name, email, password));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Container>
        <Title>Sign Up</Title>
        <form onSubmit={submitForm}>
          <Input
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="phone #"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <br />
          <Button type="submit">Sign Up</Button>
        </form>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: "flex";
  flex-direction: "column";
  margin: 15%;
`;
