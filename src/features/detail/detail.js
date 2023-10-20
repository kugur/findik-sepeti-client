import React, { Fragment, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

import { TopNavigation } from "../../components/topNavigationBar";
import { Footer } from "../../layouts/Footer";
import { NumberInput } from "components/NumberInput";
import { useFetchDataById } from "app/hooks/dataFetchingHooks";
import { Img } from "components/Img";
import { useCartsDispatch, actions } from "features/cart/CartContext";

export const Detail = () => {
  const { id } = useParams();
  const [productCount, setProductCount] = useState(1);
  const [product,, isFetching] = useFetchDataById("products/", id);
  const cartDispatch = useCartsDispatch();

  const onProductCountChange = function (count) {
    setProductCount(count > 1 ? count : 1);
  };

  const addCart = () => {
   
    cartDispatch({
      type: actions.added,
      product: product,
      quantity: productCount
    });
  };

  if (product == null || isFetching) {
    return (
      <Fragment>
        <div className="detailContainer">
          <TopNavigation></TopNavigation>
          <Container className="detailWrapper"></Container>
        </div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <div className="detailContainer">
        <TopNavigation></TopNavigation>
        <Container className="detailWrapper">
          <div className="imageContainer">
            <Img src={product.imageUrl}></Img>
          </div>
          <div className="infoContainer">
            <h2>{product.name}</h2>
            <p className="price">{product.price + " TL"}</p>
            <p>{product.description}</p>
            <div className="buttonWrapper">
              <NumberInput
                value={productCount}
                onChange={onProductCountChange}
                deneme="anana"
              ></NumberInput>
              <Button onClick={(e) => addCart()} className="addCart">
                Sepete Ekle
              </Button>
            </div>
          </div>
        </Container>
        <Footer></Footer>
      </div>
    </Fragment>
  );
};
