import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { Img } from "components/Img";
import { red } from "@mui/material/colors";
import { useCartsDispatch, actions } from "./CartContext";

const CartItem = function ({ cartItem }) {
  const cartDispatch = useCartsDispatch();
  console.log("cartItem::: {} ", JSON.stringify(cartItem));
  const onDeleteClick = function (e) {
    e.preventDefault();
    cartDispatch({
      type: actions.deleted,
      id: cartItem.id,
    });
  };
  return (
    <Row className="cartItem">
      <Col className="cartItemColumn imgContainer">
        <Img src={cartItem.product.imageUrl} className="img"></Img>
      </Col>
      <Col className="cartItemColumn">
        <Row className="title">Name</Row>
        <Row className="value">{cartItem.product.name}</Row>
      </Col>
      <Col className="cartItemColumn">
        <Row className="title">Price</Row>
        <Row className="value">{cartItem.product.price}</Row>
      </Col>
      <Col className="cartItemColumn">
        <Row className="title">Adet</Row>
        <Row className="value">{cartItem.quantity}</Row>
      </Col>
      <Col className="cartItemColumn">
        <Row className="title">Toplam</Row>
        <Row className="value">
          {cartItem.quantity * cartItem.product.price}
        </Row>
      </Col>
      <Col className="cartItemColumn">
        <Row className="title"></Row>
        <Row className="value buttonContainer">
          <Button className="buttonWrapper" onClick={(e) => onDeleteClick(e)}>
            <DeleteIcon />
          </Button>
        </Row>
      </Col>
    </Row>
  );
};

export { CartItem };
