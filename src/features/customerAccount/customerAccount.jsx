import { TopNavigation } from "components/topNavigationBar";
import { Footer } from "layouts/Footer";
import { Fragment, React } from "react";
import { Container, Form } from "react-bootstrap";

export const CustomerAccount = (params) => {
    return (
        <Fragment>
            <div className="customerAccount">
                <TopNavigation></TopNavigation>
                <Container className="customerCointainer">
                    <Form.Group classsName="userInput" controlId="name">
                        <Form.Label>Isim</Form.Label>
                        <Form.Control type="text"></Form.Control>
                    </Form.Group>
                    <Form.Group  classsName="userInput" controlId="lastName">
                        <Form.Label>Soyad</Form.Label>
                        <Form.Control type="text"></Form.Control>
                    </Form.Group>
                    <Form.Group classsName="userInput" controlId="address">
                        <Form.Label>Adres</Form.Label>
                        <Form.Control as="textarea" row={3}></Form.Control>
                    </Form.Group>
                </Container>
                <Footer></Footer>
            </div>
        </Fragment>
    )
}