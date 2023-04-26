import React, { Fragment, useMemo, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { CardContainer } from "../../components/Card/CardContainer";
import { TopNavigation } from "../../components/topNavigationBar";
import { Footer } from "../../layouts/Footer";
import { Header } from "../../layouts/Header";
import UpButton from "../../components/UpButton";
import CardFilter from "components/CardFilter";
import { filterItems, orderItems } from "constants/CardFilters";
import { createFilterParam, createSortParam } from "helpers/FilterUtil";

export const Dashboard = () => {
  const location = useLocation();
  const userInfo = location.state && location.state.userInfo;
  const cardContainerRef = useRef(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState("id");
  
  const filterValue = useMemo(() => createFilterParam(filterItems[selectedFilter]), [selectedFilter]);
  const sortValue = createSortParam(orderItems[selectedOrder]);
  
  const onFilterSelect = (eventKey, event) => {
    setSelectedFilter(eventKey);
  };

  const onOrderSelect = (eventKey, event) => {
    setSelectedOrder(eventKey);
  };

  return (
    <Fragment>
      <TopNavigation userInfo={userInfo}></TopNavigation>

      <Header></Header>

      <section className="py-5 dashboardSection">
        <Container className="customCardFilterContainer px-4 px-lg-5">
          <CardFilter
            selectedValue={selectedFilter}
            onSelect={onFilterSelect}
            items={filterItems}
          ></CardFilter>
          <CardFilter
            selectedValue={selectedOrder}
            onSelect={onOrderSelect}
            items={orderItems}
          ></CardFilter>
        </Container>
        <Container className="container px-4 px-lg-5 mt-5 dashboardElements">
          <CardContainer
            key={selectedFilter+selectedOrder}
            filters={filterValue}
            order={sortValue}
            ref={cardContainerRef}
            colCount={4}
          ></CardContainer>
        </Container>
        <UpButton componentRef={cardContainerRef}></UpButton>
      </section>
      <Footer></Footer>
    </Fragment>
  );
};
