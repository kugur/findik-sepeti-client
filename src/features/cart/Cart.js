import React, { useContext } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { CartItem } from "./CartItem";
import { useCarts, util as cartUtil } from "./CartContext";
import { UserContext } from "app/UserProvider";
import { useNavigate } from "react-router-dom";

export const Cart = (props) => {
  const navigate = useNavigate();
  
  const {user} = useContext(UserContext);
  const carts = useCarts();
  const totalProduct = cartUtil.total(carts);
  const shippingCost = 20;
  
  const cartItems = carts.map((cart) => {
    return <CartItem cartItem={cart}></CartItem>;
  });
  const emptyItems = <div>Sepetiniz bos</div>;
  
  const handleApproveCart = function() {
    if (!user || user === undefined || !(user.email)) {
      navigate("/login");
    } else {
      navigate("/payment");
    }
  }

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
                  <div className="title">Urun Toplami</div>
                  <div className="value"> {totalProduct} TL</div>
                </div>
                <div className="paymentRow">
                  <div className="title">Kargo ucreti</div>
                  <div className="value"> {shippingCost} TL</div>
                </div>
                <div className="paymentRow total">
                  <div className="title">TOPLAM</div>
                  <div className="value"> {totalProduct + shippingCost} TL</div>
                </div>
                <div className="paymentRow buttonContainer">
                  <Button onClick={() => handleApproveCart()}>
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
