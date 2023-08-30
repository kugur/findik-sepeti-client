import { useState } from "react";
import { ProductTemplate } from "./ProductTemplate";
import httpClientWrapper from "components/Common/HttpClientWrapper";
import { useNavigate } from "react-router-dom";

const CreateProduct = function (props) {
  const navigate = useNavigate();
  const defaultProduct = {
    name: "isim",
    price: 0.0,
    description: "aciklama",
    category: "",
    imageFile: "",
  };
  const [data, setData] = useState(defaultProduct);
  const [errorMessage, setErrorMessage] = useState("");

  const setValue = function (key, value) {
    setData({
      ...data,
      [key]: value,
    });
  };

  const onSubmit = function () {
    console.log(JSON.stringify(data));
    const formData = new FormData();

    for (let key in defaultProduct) {
      if (key === "category") {
        formData.append("categoryId", data[key] ? data[key].id : "");
        continue;
      }
      formData.append(key, data[key]);
    }

    httpClientWrapper.post(
      "/products",
      formData,
      function (response) {
        console.log("onSubmit Result   " + JSON.stringify(response));
        navigate("/");
      },
      function (error) {
        console.log("onSubmit error :: " + JSON.stringify(error));
        setErrorMessage("Hata oldu kayit edilemedi.");
      }
    );
  };

  return (
    <ProductTemplate
      data={data}
      setValue={setValue}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
    ></ProductTemplate>
  );
};

export { CreateProduct };
