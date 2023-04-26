import httpClientWrapper from "components/Common/HttpClientWrapper";
import { useEffect, useState } from "react";

const useFetchData = function (url, pageSize, pageNumber, pageSort) {
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [pageModel, setPageModel] = useState({
    number: 0,
    size: 6,
    totalPages: 0,
  });

  useEffect(() => {
    console.log("[useFetchData] useEffect isFetching ::: " + isFetching);
    let ignore = false;
    setIsFetching(true);
    const productRequestParams = new Map();

    productRequestParams.set("pageInfo", {
      page: pageNumber,
      size: pageSize,
      sort: pageSort,
    });
    
    httpClientWrapper.get(
      url,
      function (response) {
        if (!ignore) {
          setData(response.content);
          setPageModel({
            number: response.number,
            size: response.size,
            totalPages: response.totalPages,
          });
          setIsFetching(false);
        }
      },
      function (error) {
        if (!ignore) {
          setData(null);
          setIsFetching(false);
        }
      },
      productRequestParams
    );
    return () => {
      ignore = true;
      console.log("[useFetchData] clean effect");
      setIsFetching(false);
    };
  }, [url, pageSize, pageNumber, pageSort, isFetching]);

  return [data, pageModel, isFetching];
};

const useInfinityScrollFetchData = function (url, pageSize, pageSort, filters) {
  const [data, setData] = useState([]);
  const [pageModel, setPageModel] = useState({
    number: -1,
    totalPage: 0,
  });
  const [inProgress, setInProgress] = useState(false);

  useEffect(() => {
    const fetchData = function () {
      let ignore = false;
      setInProgress(true);
      const productRequestParams = new Map();
      productRequestParams.set("pageInfo", {
        page: pageModel.number + 1,
        size: pageSize,
        sort: pageSort,
      });

      if (filters && filters instanceof Array && filters.length > 0) {
        productRequestParams.set("filters", filters);
      }

      httpClientWrapper.get(
        url,
        function (response) {
          if (!ignore) {
            setData([...data, ...response.content]);
            setPageModel({
              number: response.number,
              totalPages: response.totalPages,
            });
            setInProgress(false);
          }
        },
        function (error) {
          if (!ignore) {
            setInProgress(false);
          }
        },
        productRequestParams
      );
      return () => {
        ignore = true;
        setInProgress(false);
      };
    };

    const handleScroll = function () {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;

      if (
        scrollTop + clientHeight >= scrollHeight - 10 &&
        !inProgress &&
        pageModel.totalPages >= pageModel.number + 1
      ) {
        console.log("[useInfinityScrollFetchData2] handleScroll");
        fetchData("/products", 6, pageSort);
      }
    };

    window.addEventListener("scroll", handleScroll);
    if (!inProgress && pageModel.number === -1) {
      fetchData("/products", 6, pageSort);
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, [
    pageModel.number,
    pageModel.totalPages,
    pageSize,
    pageSort,
    url,
    data,
    inProgress,
    filters,
  ]);

  return [inProgress, data];
};

export { useFetchData, useInfinityScrollFetchData };
