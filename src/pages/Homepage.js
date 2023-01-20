import { Title } from "../styled";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import styled from "styled-components";
import "./Homepage.css";
import { useEffect } from "react";
import { fetchAllGalleries } from "../store/gallery/thunks";
import { useDispatch, useSelector } from "react-redux";

import { Banner } from "../components";

export const Homepage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllGalleries());
  }, [dispatch]);

  return (
    <div>
      <Banner />
      <Container>
        <Title>Hi</Title>
        <Hero />
        <Link to="/photomarket">
          <Button>View the photomarket</Button>
        </Link>
        {/* <Link to="/mygallery/">
          <Button>View my galleries and photos</Button>
        </Link>
        <Link to="/myprofile">
          <Button>View my profile</Button>
        </Link>
        <Link to="/signip">
          <Button>View my profile</Button>
        </Link> */}
      </Container>
      <Footer />
    </div>
  );
};

const Container = styled.div`
  margin: 20px;
  border: solid black 2px;
`;

const Button = styled.button`
  background-color: blue;
  border: solid white 2px;
  border-radius: 5px;
  color: white;
`;
