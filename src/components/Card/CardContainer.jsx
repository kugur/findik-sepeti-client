import React, { forwardRef, Fragment, useEffect, useRef} from "react";
import { CustomCard } from "./CustomCard";
import LoadingCustomCard from "./LoadingCustomCard";
import { Col } from "react-bootstrap";
import findikBackground from "assets/imgs/deneme.jpg";
import { useState } from "react";
import httpClientWrapper from "components/Common/HttpClientWrapper";

const CardContainer = forwardRef(({ colCount, filter, order }, ref) => {
  console.log("[CardContainer] is rendered");
  const [data, setData] = useState([]);
  const [pageModel, setPageModel] = useState({
    number: 0,
    size: 6,
    totalPages: 1,
    lastPagedFetched: false,
    filter: "all",
    order: "id"
  });

  useEffect(() => {
    let ignore = false;
    const isFilterChanged = pageModel.filter !== filter;
    const isOrderChanged = pageModel.order !== order;

    const orderValues = {
      "id": "ASC,Id",
      "priceAsc": "ASC,price",
      "priceDesc": "DESC,price"
    };

    const fetchData = () => {
      const productRequestParams = new Map();  
      productRequestParams.set(
        "pageInfo",
        {
          page: isFilterChanged || isOrderChanged ? 0 : pageModel.number,
          size: pageModel.size,
          sort: orderValues[order]
        }
      );

      if (filter === "raw") {
        productRequestParams.set("filters", [{
          name: "category",
          operation: "EQUAL",
          value: "raw",
        }]);
      } else if (filter === "processed") {
        productRequestParams.set("filters", [{
          name: "category",
          operation: "EQUAL",
          value: "processed",
        }]);
      }

      httpClientWrapper.get(
        "/products",
        function (response) {
          if (!ignore) {
            setPageModel({
              number: response.number,
              size: response.size,
              totalPages: response.totalPages,
              lastPagedFetched: true,
              filter: filter,
              order: order
            });

            if (isFilterChanged || isOrderChanged) {
              setData([...response.content]);
            } else {
              setData((data) => [...data, ...response.content]);
            }
            
            console.log("httpClient response has been called.");
          }
        },
        function (error) {
          console.error(
            "[Dashboard] Exception occurred while fetching items {}",
            error
          );

          setPageModel((pageModel) => ({
            ...pageModel,
            lastPagedFetched: true,
          }));
        },
        productRequestParams
      );
    };

    if (!pageModel.lastPagedFetched || isFilterChanged || isOrderChanged) {
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, [pageModel.lastPagedFetched, pageModel.size, pageModel.number, pageModel.filter, pageModel.order, filter, order]);

  useEffect(() => {
    console.log("[CardContainer] useEffect ici");
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (!pageModel.lastPagedFetched) {
        return;
      }
      setPageModel((pageModel) => {
        const number =
          pageModel.number < pageModel.totalPages
            ? pageModel.number + 1
            : pageModel.number;
        if (number !== pageModel.number) {
          return {
            ...pageModel,
            number: number,
            lastPagedFetched: false,
          };
        }
        return pageModel;
      });
    }
  };

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

    if (!pageModel.lastPagedFetched) {
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
