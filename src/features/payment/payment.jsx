import { Formik } from "formik";
import { Container, Form, Button } from "react-bootstrap";
import {
  actions,
  fetchCarts,
  useCartsDispatch,
  useCarts,
  util as cartUtil,
} from "features/cart/CartContext";
import { UserContext } from "app/UserProvider";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import httpClientWrapper from "components/Common/HttpClientWrapper";
import { Toaster } from "components/Common/Toaster";

const Payment = function () {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const carts = useCarts();
  const dispatch = useCartsDispatch();

  useEffect(() => {
    console.log("payment useEffect has been called.");
    fetchCarts(dispatch);
  }, [dispatch]);

  const handleSubmit = (values) => {
    let salesOrder = {
      payment: { creditCardNumber: values.creditCard },
      shipping: {
        address: values.address,
        note: values.shippingNote,
        name: values.name,
      },
    };

    const orderItems = carts.map((cart) => {
      return {
        product: cart.product,
        quantity: cart.quantity,
      };
    });
    salesOrder.orderItems = orderItems;

    httpClientWrapper.post(
      "/order",
      salesOrder,
      function (response) {
        console.log("response :: {} ", response);
        dispatch({
          type: actions.initilize,
          cartItems: [],
        });

        if (response === "ORDER_CREATED") {
          Toaster.info("Siparis basarili sekilde olusturuldu.");
        } else {
          Toaster.error("Siparis olusturulamadi.");
        }
        navigate("/");
      },
      function (error) {
        console.log("error :: {} ", error);
        Toaster.error("Siparis olusturulamadi.");
      }
    );
  };

  const shippingPrice = 20;
  const totalProduct = cartUtil.total(carts);
  const total = totalProduct + shippingPrice;
  const shippingPersonName = (
    (user.firstName || "") +
    " " +
    (user.lastName || "")
  ).trim();
  const shippingAddress = user.address || "";

  const PaymentForm = ({
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
  }) => (
    <Form noValidate onSubmit={handleSubmit}>
      <fieldset>
        <label>Teslimat Bilgili</label>
        {JSON.stringify(carts)}
        <div className="deliveryGroup">
          <Form.Group className="customerGroup" controlId="address">
            <Form.Label>Teslimat Adresi</Form.Label>
            <Form.Control
              type="text"
              name="address"
              className="inputArea"
              isInvalid={touched.address && errors.address}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.address}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.address}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="customerGroup" controlId="name">
            <Form.Label>Alici ismi</Form.Label>
            <Form.Control
              type="text"
              name="name"
              className="inputArea"
              onChange={handleChange}
              isInvalid={touched.name && errors.name}
              onBlur={handleBlur}
              value={values.name}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.name}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="customerGroup" controlId="shippingNote">
            <Form.Label> Teslimat Notu </Form.Label>
            <Form.Control
              type="text"
              name="shippingNote"
              className="inputArea"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.shippingNote}
            ></Form.Control>
          </Form.Group>
        </div>

        <label>Odeme bilgileri</label>
        <div className="paymentGroup">
          <Form.Group className="customerGroup" controlId="creditCard">
            <Form.Label>Kredi karti bilgilieri </Form.Label>
            <Form.Control
              type="text"
              name="creditCard"
              className="inputArea"
              isInvalid={touched.creditCard && errors.creditCard}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.creditCard}
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.creditCard}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
      </fieldset>
      <Form.Label> Siparis Ozeti</Form.Label>

      <div className="summaryContainer">
        <div className="paymentRow">
          <div className="title">Urun Toplami</div>
          <div className="value"> {totalProduct}TL</div>
        </div>
        <div className="paymentRow">
          <div className="title">Kargo ucreti</div>
          <div className="value"> {shippingPrice}TL</div>
        </div>
        <div className="paymentRow total">
          <div className="title">TOPLAM</div>
          <div className="value"> {total}</div>
        </div>
        <div className="paymentRow buttonContainer">
          {JSON.stringify(user)}
          <Button type="submit">Siparisi Tamamla</Button>
        </div>
      </div>
    </Form>
  );

  return (
    <>
      <h1>Payment Sayfasi</h1>
      <Container className="payment">
        <Formik
          initialValues={{
            address: shippingAddress,
            name: shippingPersonName,
            creditCard: "",
            shippingNote: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Isim Alani Zorunlu";
            }
            if (!values.address) {
              errors.address = "Adres Alani Zorunlu";
            }

            if (!values.creditCard) {
              errors.creditCard = "Kredi Karti Alani Zorunlu";
            }
            return errors;
          }}
          onSubmit={handleSubmit}
          component={PaymentForm}
          enableReinitialize={true}
        />
      </Container>
    </>
  );
};

export { Payment };
