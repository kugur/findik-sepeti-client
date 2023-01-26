import { TopNavigation } from "components/topNavigationBar";
import { Footer } from "layouts/Footer";
import { Fragment, React, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";

export const CustomerAccount = (params) => {
    useEffect(() => {
        console.log("useEffect has been called.");
        console.log("process env ::", "http://" + process.env.REACT_APP_SERVER_URL + "/users");
        const myHeaders = new Headers();

     
        fetch("http://" + process.env.REACT_APP_SERVER_URL + "/users", {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
                'Access-Control-Allow-Headers': '*',
            },
        })
            .then(function (response) {
                if (response.status === 200) {
                    return response.json();
                } else {
                 
                }
            })
            .then(function (data) {
                // Do something with the data, like store it in a local variable
                console.log("users data ", data);
            });

    }, []);
    return (
        <Fragment>
            <div className="customerAccount">
                <TopNavigation></TopNavigation>
                <Container className="customerContainer">
                    <h2 className="customerTitle">Kullanici Bilgileri</h2>
                    <Form>
                        <fieldset>
                            <Form.Group className="customerGroup" controlId="name">
                                <Form.Label>Isim</Form.Label>
                                <Form.Control type="text" className="inputArea"></Form.Control>
                            </Form.Group>
                            <Form.Group className="customerGroup" controlId="lastName">
                                <Form.Label>Soyad</Form.Label>
                                <Form.Control type="text" className="inputArea"></Form.Control>
                            </Form.Group>

                            <div key="inline-checkbox">
                                <Form.Label className="genderLabel">Cinsiyet: </Form.Label>
                                <Form.Check inline name="gender" type="radio" id="male" label="Erkek"></Form.Check>
                                <Form.Check inline name="gender" type="radio" id="female" label="Kadin"></Form.Check>
                            </div>
                            
                            <Form.Group className="customerGroup" controlId="email">
                                <Form.Label>E-posta adresi</Form.Label>
                                <Form.Control type="email" className="inputArea"></Form.Control>
                            </Form.Group>

                            <Form.Group className="customerGroup" controlId="address">
                                <Form.Label>Adres</Form.Label>
                                <Form.Control as="textarea" row={3} className="inputArea"></Form.Control>
                            </Form.Group>

                        </fieldset>
                        <Button type="submint">Guncelle</Button>
                    </Form>
                </Container>
                <Footer></Footer>
            </div>
        </Fragment>
    )
}