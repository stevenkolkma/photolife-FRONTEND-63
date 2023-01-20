import { Title } from "../styled";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import styled from "styled-components";
import "./Homepage.css";
import { useEffect } from "react";
import { selectToken } from "../store/user/selectors";
import { fetchAllGalleries } from "../store/gallery/thunks";
import { useDispatch, useSelector } from "react-redux";

import { Banner } from "../components";

export const Homepage = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  useEffect(() => {
    dispatch(fetchAllGalleries());
  }, [dispatch]);

  return (
    <div>
      <Banner />
      <Container style={{ textAlign: "center" }}>
        <Title>Welcome to PhotoLife.</Title>
        <Hero />
        <Container style={{ display: "flex", justifyContent: "space-evenly" }}>
          <Link to="/photomarket">
            <Button>View the photomarket</Button>
          </Link>
          {!token && (
            <Link to="/signUp">
              <Button>Sign up!</Button>
            </Link>
          )}
        </Container>
        <div>
          <p>
            In PhotoLife, you can buy and sell your printed photography. Come
            and sign up today, upload your pictures and check our photos out!
          </p>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

const Container = styled.div`
  margin: 20px auto;
  width: 80%;
  // border: solid black 2px;
`;

const Button = styled.button`
  background-color: blue;
  border: solid white 2px;
  border-radius: 5px;
  color: white;
`;
