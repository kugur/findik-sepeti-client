import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { CardContainer } from "../../components/Card/CardContainer";
import { TopNavigation } from "../../components/topNavigationBar";
import { Footer } from "../../layouts/Footer";
import { Header } from "../../layouts/Header";

export const Dashboard = () => {
  const location = useLocation();
  const userInfo = location.state && location.state.userInfo;

  return (
    <Fragment>
      <TopNavigation userInfo={userInfo}></TopNavigation>

      <Header></Header>

      <section className="py-5 dashboardSection">
        <Container className="container px-4 px-lg-5 mt-5 dashboardElements">
          <CardContainer colCount={4}></CardContainer>
        </Container>
      </section>
      <Footer></Footer>
    </Fragment>
  );
};
