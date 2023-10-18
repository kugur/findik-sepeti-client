import { useFetchDataById } from "app/hooks/dataFetchingHooks";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProductTemplate } from "./ProductTemplate";
import httpClientWrapper from "components/Common/HttpClientWrapper";
import { Toaster } from "components/Common/Toaster";

const EditProduct = function (props) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [data, setData, isFetching] = useFetchDataById("/products/", productId);
  const [errorMessage, setErrorMessage] = useState();
  const setValue = function (key, value) {
    setData({
      ...data,
      [key]: value,
    });
  };
  const onSubmit = function () {
    const formData = new FormData();

    for (let key in data) {
      if (key === "category") {
        formData.append("categoryId", data[key].id);
        continue;
      }
      formData.append(key, data[key]);
    }

    httpClientWrapper.put(
      "/products",
      formData,
      function (response) {
        navigate("/");
      },
      function (error) {
        console.log("exception occurred, error {}", error);
        Toaster.warning("Could not saved");
      }
    );
  };

  if (!data || isFetching) return <></>;

  return (
    <ProductTemplate
      data={data}
      setValue={setValue}
      onSubmit={onSubmit}
    ></ProductTemplate>
  );
};

export { EditProduct };
