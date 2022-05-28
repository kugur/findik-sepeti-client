import React from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom"
import findikBackground from '../../assets/imgs/deneme.jpg'

export const Detail = (params) => {
    const { product, cost } = useParams();

    console.log(JSON.stringify(product));
    console.log(JSON.stringify(cost));
    return (
        <Container className="detailCotainer">
            <div>
                <Row className="detailRow" >
                    <div className="col-6 detailImageCol"  >


                        <img src={findikBackground} className="detailImage"></img>


                    </div>
                    <div className="col-6" >
                        <Row>
                            <h1 className="text-primary">Giresun findik</h1>
                            <p>Giresundan bahcden toplanan findik.</p>
                            <Row className="my-2">
                                <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Dropdown Button
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </Col>
                                <Col>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Dropdown Button
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                </Col>
                            </Row>
                            <Button>Sepete Ekle</Button>
                        </Row>
                    </div>
                </Row>
            </div>
        </Container>
    );
}
