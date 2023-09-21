import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CartItem } from "./CartItem";
import { useCarts } from "./CartContext";
import { useNavigate } from "react-router-dom";

export const Cart = (props) => {
  const navigate = useNavigate();
  const carts = useCarts();
  const total = carts.reduce(
    (sumPrice, cart) => cart.product.price * cart.quantity + sumPrice,
    0
  );
  const cartItems = carts.map((cart) => {
    return <CartItem cartItem={cart}></CartItem>;
  });
  const emptyItems = <div>Sepetiniz bos</div>;

  return (
    <>
      <h1>Sepetim</h1>

      <Container>
        {cartItems.length > 0 ? (
          <Row className="cartContainer">
            <Col className="cartItemContainer">{cartItems}</Col>
            <Col className="paymentContainer">
              <Container>
                <div className="paymentRow">
                  <div className="title">Urun Toplamai</div>
                  <div className="value"> 11.10 TL</div>
                </div>
                <div className="paymentRow">
                  <div className="title">Kargo ucreti</div>
                  <div className="value"> 10 TL</div>
                </div>
                <div className="paymentRow total">
                  <div className="title">TOPLAM</div>
                  <div className="value"> {total}</div>
                </div>
                <div className="paymentRow buttonContainer">
                  <Button onClick={() => navigate("/payment")}>
                    Sepeti Onayla
                  </Button>
                </div>
              </Container>
            </Col>
          </Row>
        ) : (
          emptyItems
        )}
      </Container>
    </>
  );
};
