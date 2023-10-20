import React, { Fragment, useMemo, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { CardContainer } from "../../components/Card/CardContainer";
import { TopNavigation } from "../../components/topNavigationBar";
import { Footer } from "../../layouts/Footer";
import { Header } from "../../layouts/Header";
import UpButton from "../../components/UpButton";
import CardFilter from "components/CardFilter";
import { orderItems } from "constants/CardFilters";
import { createFilterParam, createSortParam } from "helpers/FilterUtil";
import { ComboBox } from "components/ComboBox";

export const Dashboard = () => {
  console.log("[Dashboard] intializing");
  const location = useLocation();
  const userInfo = location.state && location.state.userInfo;
  const cardContainerRef = useRef(null);
  const defultSelectedFilter = {id: "all", name: "Hepsi", emptyFilter: true};
  const [selectedFilter, setSelectedFilter] = useState(defultSelectedFilter);
  const [selectedOrder, setSelectedOrder] = useState("id");

  const filterValue = useMemo(
    () =>
      createFilterParam({
        name: "category",
        operation: "EQUAL",
        value: selectedFilter.name,
        emptyFilter: selectedFilter.emptyFilter
      }),
    [selectedFilter.name, selectedFilter.emptyFilter]
  );
  const sortValue = createSortParam(orderItems[selectedOrder]);

  const onFilterSelect = (filter) => {
    setSelectedFilter(filter);
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
          <ComboBox
            value={selectedFilter.name}
            onChange={onFilterSelect}
            url={"category"}
            defaultItems={[defultSelectedFilter]}
          ></ComboBox>

          <CardFilter
            selectedValue={selectedOrder}
            onSelect={onOrderSelect}
            items={orderItems}
          ></CardFilter>
        </Container>
        <Container className="container px-4 px-lg-5 mt-5 dashboardElements">
          <CardContainer
            key={selectedFilter + selectedOrder}
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
