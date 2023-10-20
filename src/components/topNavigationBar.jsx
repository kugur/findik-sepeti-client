import { React, useContext, memo } from "react";
import { Navbar, Container, Nav, Stack, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserButton } from "./UserButton";
import { UserContext } from "app/UserProvider";
import { useCarts, actions, useCartsDispatch } from "features/cart/CartContext";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export const TopNavigation = memo((data) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const carts = useCarts();
  const cartsDispatch = useCartsDispatch();
  const cartsItemCount =
    carts !== null && Array.isArray(carts) ? carts.length : 0;

  console.log("[TopNavigation] created");

  const handleCartClick = function () {
    navigate("/cart");
  };

  return (
    <Navbar expand="lg" className="dashboard">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Findik Sepeti
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse
          id="navbarScroll"
          className="justify-content-md-center"
        >
          <Nav className="me-auto"></Nav>
        </Navbar.Collapse>
        <Stack direction="horizontal" gap={1} className="m-2">
          <UserButton userInfo={user} onLogout={() => {
            logout();
            cartsDispatch({
              type: actions.initilize,
              cartItems: []
            })}
            }></UserButton>
            <Badge className="shoppingCart" >
            <ShoppingCartIcon  onClick={() => handleCartClick()}></ShoppingCartIcon>
            {cartsItemCount}</Badge>
      
        </Stack>
      </Container>
    </Navbar>
  );
});
