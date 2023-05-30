import {React, useContext, memo} from "react";
import { Navbar, Container, Nav, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserButton } from "./UserButton";
import  {UserContext}  from "app/UserProvider";
import { Toaster } from "./Common/Toaster";

export const TopNavigation = memo((data) => {
    const {user, logout} = useContext(UserContext);
    
    console.log("[TopNavigation] created");
   
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
});


