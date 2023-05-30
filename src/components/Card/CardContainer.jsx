import React, { forwardRef, Fragment} from "react";
import { CustomCard } from "./CustomCard";
import LoadingCustomCard from "./LoadingCustomCard";
import { Col } from "react-bootstrap";
import findikBackground from "assets/imgs/deneme.jpg";
import {  useInfinityScrollFetchData} from "app/hooks/dataFetchingHooks";

const CardContainer = forwardRef(({ colCount, order, filters }, ref) => {
  const [ isLoading, data] = useInfinityScrollFetchData("/products", 6, order, filters);
  
  const getClassForColumnCount = (count) => {
    if (count === 3) {
      return "row-cols-2 row-cols-md-3 row-cols-xl-3 ";
    } else if (count === 4) {
      return "row-cols-2 row-cols-md-3 row-cols-xl-4 ";
    } else {
      return "ow-cols-2 row-cols-md-3 row-cols-xl-4 ";
    }
  };

  const createLoadingCards = () => {
    let loadingCardsCount = 0;
    let loadingCards = [];
    let columnCount;
    const containerWidth = window.innerWidth;

    // calculate number of columns based on container width
    if (containerWidth >= 1200) {
      columnCount = 4; // for xl breakpoint
    } else if (containerWidth >= 768) {
      columnCount = 3; // for md breakpoint
    } else {
      columnCount = 2; // for xs and sm breakpoints
    }

    if (isLoading) {
      loadingCardsCount = (data.length % columnCount) + columnCount;
    }

    for (let i = 0; i < loadingCardsCount; i++) {
      loadingCards.push(
        <Col className="mb-5" key={"loadingCard" + i}>
          <LoadingCustomCard id={`loadingCard${i}`}></LoadingCustomCard>
        </Col>
      );
    }
    return loadingCards;
  };
  
  return (
    <Fragment>
      <div
        ref={ref}
        className={
          "row gx-4 gx-lg-5  justify-content-center " +
          getClassForColumnCount(colCount)
        }
      >
        {data.map((item) => (
          <Col className="mb-5" key={item.id}>
            <CustomCard image={findikBackground} id={item.id} title={item.name} price={item.price}></CustomCard>
          </Col>
        ))}
        {createLoadingCards()}
      </div>
    </Fragment>
  );
});

export { CardContainer };
