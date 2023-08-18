import httpClientWrapper from "components/Common/HttpClientWrapper";
import { useEffect, useState } from "react";
import { number, ref } from "yup";

/**
 * 
 * @param {requested url} url 
 * @param {* requested id} id 
 * @returns fetching data. If id is NaN or fetching is failed, it will return null;
 */
const useFetchDataById = function(url, id) {
  console.log("[useFetchDataById] url: " + url + " id: " + id);
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  
  useEffect(() => {
    console.log("[useFetchDataById] useEffec t url: " + url + " id: " + id);
    if (!(id instanceof number)) {
      return;
    }

    let ignore = false;
    setIsFetching(true);

    httpClientWrapper.get(url + id,
      function(response) {
        if (ignore) return;

        setData(response);
        setIsFetching(false);
      },
      function(error) {
        if (ignore) return;
        
        setData(null);
        setIsFetching(false);
      });

      return () => {
        ignore = true;
      };
  }, [url, id]);

  return [data, setData, isFetching];
};

const useFetchData = function (url, pageSize, pageNumber, pageSort) {
  console.log("[useFetchData] pageNumber ::: " + pageNumber);
  const [data, setData] = useState(null);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchFlip, setFetchFlip] = useState(false);
  const [pageModel, setPageModel] = useState({
    number: 0,
    size: 6,
    totalPages: 0,
    sort: pageSort,
  });

  const reFetch = function() {
    setFetchFlip(fetchFlip => !fetchFlip);
  }

  useEffect(() => {

    console.log("[useFetchData] ");
    let ignore = false;
    const productRequestParams = new Map();
    setIsFetching(true);

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
            sort: pageSort,
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
    };
  }, [url, pageSize, pageNumber, pageSort, fetchFlip]);

  return [data, pageModel, reFetch];
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
          console.log("[useInfinityScrollFetchData] ignore:: " + ignore);
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
          console.log("[useInfinityScrollFetchData] ignore:: " + ignore);
          if (!ignore) {
            setInProgress(false);
          }
        },
        productRequestParams
      );
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

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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

export { useFetchData, useFetchDataById, useInfinityScrollFetchData };
