import React, { Fragment } from "react";
import { Navbar, Container, Nav, NavDropdown, Form, FormControl, Button, Stack, Row, Col, Card } from "react-bootstrap";
import findikBackground from '../../assets/imgs/deneme.jpg'
import { useNavigate } from 'react-router-dom';
import { CustomCard } from "../../components/Card/CustomCard";


export const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <Fragment>
            <Navbar bg="light" expand="lg" className="dashboard">
                <Container  >
                    <Navbar.Brand href="#" >Findik Sepeti</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className="justify-content-md-center">
                        <Form className="d-flex justify-center">
                            <FormControl
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                    <Stack direction="horizontal" gap={1} className='m-2' >
                        <Button variant="outline-secondary">Log in</Button>
                        <Button variant="secondary" >Sepet</Button>
                    </Stack>
                </Container>
            </Navbar>
            <header className="bg-dark py-5 bg-image">
                <div className="container px-4 px-lg-5 my-5">
                    <div className="text-center text-white">
                        <h1 className="display-4 fw-bolder">Shop in style</h1>
                        <p className="lead fw-normal text-white-50 mb-0">With this shop hompeage template</p>
                    </div>
                </div>
            </header>

            <section className="py-5 dashboardSection">
                <Container className="container px-4 px-lg-5 mt-5 dashboardElements">
                    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">

                        <Col className="mb-5">
                            <CustomCard image={findikBackground}></CustomCard>
                        </Col>
                        <Col className="mb-5">
                            <CustomCard image={findikBackground}>

                            </CustomCard>
                            {/* <Card className="findikCard">
                                <Card.Img variant="top" src={findikBackground} />
                                <Card.Body>
                                    <Card.Title>Card Title</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                    <Button variant="primary" onClick={() =>    navigate('abc/123')}>Go somewhere</Button>
                                </Card.Body>
                            </Card> */}
                        </Col>
                        <Col className="mb-5">
                            <CustomCard image={findikBackground}></CustomCard>
                        </Col>

                    </div>

                </Container>

            </section>
        </Fragment>
    )

}