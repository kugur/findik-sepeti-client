import React, { Fragment, useEffect, useCallback, memo } from "react";
import { CustomCard } from "./CustomCard";
import LoadingCustomCard from "./LoadingCustomCard";
import { Col } from "react-bootstrap";
import findikBackground from "assets/imgs/deneme.jpg";
import { useState } from "react";
import httpClientWrapper from "components/Common/HttpClientWrapper";

const CardContainer = memo(({ colCount }) => {
  console.log("[CardContainer] is rendered");
  const [data, setData] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);
  const [pageModel, setPageModel] = useState({
    number: 0,
    size: 6,
    totalPages: 1,
    lastPagedFetched: false,
  });

  useEffect(() => {
    let ignore = false;

    const fetchData = () => {
      // setIsFetching(true);

      const productRequestParams = new Map();
      productRequestParams.set(
        "pageInfo",
        {
          page: pageModel.number,
          size: pageModel.size,
        },
        [pageModel.number, pageModel.size]
      );

      httpClientWrapper.get(
        "/products",
        function (response) {
          if (!ignore) {
            setPageModel({
              number: response.number,
              size: response.size,
              totalPages: response.totalPages,
              lastPagedFetched: true,
            });
            setData((data) => [...data, ...response.content]);
            console.log("httpClient response has been called.");
            // setIsFetching(false);
          }
        },
        function (error) {
          console.error(
            "[Dashboard] Exception occurred while fetching items {}",
            error
          );
          // setIsFetching(false);
        },
        productRequestParams
      );
    };

    if (!pageModel.lastPagedFetched) {
      fetchData();
    }

    return () => {
      ignore = true;
    };
  }, [pageModel.lastPagedFetched, pageModel.size, pageModel.number]);

  useEffect(() => {
    console.log("[CardContainer] useEffect ici");
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

    // console.log("[CardContainer] other result :: " + (window.innerHeight + window.pageYOffset >= document.body.offsetHeight));

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

    if (!pageModel.lastPagedFetched) {
      loadingCardsCount = 3;
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
        className={
          "row gx-4 gx-lg-5  justify-content-center " +
          getClassForColumnCount(colCount)
        }
      >
        {data.map((item) => (
          <Col className="mb-5" key={item.id}>
            <CustomCard image={findikBackground} id={item.id}></CustomCard>
          </Col>
        ))}
      </div>
      <div className="row justify-content-center ">
        {/* <Button >Load More</Button> */ createLoadingCards()}
      </div>
    </Fragment>
  );
});

export { CardContainer };
