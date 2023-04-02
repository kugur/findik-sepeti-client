import {React, useContext, useEffect} from "react";
import { Navbar, Container, Nav, Stack, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { UserButton } from "./UserButton";
import  {UserContext}  from "app/UserProvider";
import httpClientWrapper from "./Common/HttpClientWrapper";
import { Toaster } from "./Common/Toaster";

export const TopNavigation = (data) => {
    const {user, logout} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("[TopNavigation] created");
    });
   
    return (
        <Navbar bg="light" expand="lg" className="dashboard">
            <Container  >
                <Navbar.Brand as={Link} to="/" >Findik Sepeti</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="justify-content-md-center">
                    <Nav className="me-auto">
                        <Nav.Link  as={Link} to="/">Home</Nav.Link>
                        <Nav.Link  as={Link} to="processedNuts">Islenmis Findik</Nav.Link>
                        <Nav.Link onClick={() => Toaster.info('Deneme toast')}>Islenmemis Findik</Nav.Link>
                        {/* <Form className="d-flex justify-center">
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
        </Form> */}
                    </Nav>
                </Navbar.Collapse>
                <Stack direction="horizontal" gap={1} className='m-2' >
                    <UserButton userInfo={user} onLogout={logout}></UserButton>
                    {/* <Button variant="outline-secondary" onClick={e => navigate('/login')}> {userInfo ? userInfo.email : 'Log in'}</Button> */}
                    <Button variant="secondary" >Sepet</Button>
                </Stack>
            </Container>
        </Navbar>
    );
};


