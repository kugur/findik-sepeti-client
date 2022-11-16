import React from "react";
import { Navbar, Container, Nav, Stack, Button } from "react-bootstrap";

export const TopNavigation = () => {

    return (
        <Navbar bg="light" expand="lg" className="dashboard">
            <Container  >
                <Navbar.Brand href="/" >Findik Sepeti</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" className="justify-content-md-center">
                    <Nav className="me-auto">
                        <Nav.Link href="login">Home</Nav.Link>
                        <Nav.Link href="processedNuts">Islenmis Findik</Nav.Link>
                        <Nav.Link href="raw">Islenmemis Findik</Nav.Link>
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
                    <Button variant="outline-secondary">Log in</Button>
                    <Button variant="secondary" >Sepet</Button>
                </Stack>
            </Container>
        </Navbar>
    );
};


