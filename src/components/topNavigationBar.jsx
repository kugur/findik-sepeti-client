import { React, useContext, memo } from "react";
import { Navbar, Container, Nav, Stack, Button, Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserButton } from "./UserButton";
import { UserContext } from "app/UserProvider";
import { Toaster } from "./Common/Toaster";

import { Input } from "@mui/icons-material";
import { useCarts } from "features/cart/CartContext";

export const TopNavigation = memo((data) => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext);
  const carts = useCarts();
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
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="processedNuts">
              Islenmis Findik
            </Nav.Link>
            <Nav.Link onClick={() => Toaster.info("Deneme toast")}>
              Islenmemis Findik
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Stack direction="horizontal" gap={1} className="m-2">
          <UserButton userInfo={user} onLogout={logout}></UserButton>
          {/* <Button variant="outline-secondary" onClick={e => navigate('/login')}> {userInfo ? userInfo.email : 'Log in'}</Button> */}
          <Button variant="secondary" onClick={() => handleCartClick()}>
            Sepet-ekle
            <Badge pill>{cartsItemCount}</Badge>
          </Button>
          <div>{JSON.stringify(carts)}</div>
        </Stack>
      </Container>
    </Navbar>
  );
});
