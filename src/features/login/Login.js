import { Tab } from "bootstrap";
import React, { Fragment } from "react";
import { Container, Row, Input, TabContainer, Tabs, Form } from "react-bootstrap";

export const Login = () => {
    const loginTitle = "login";
    const signUpTitle = "Sign Up";
    return (
        <Fragment>
            <Container className="loginContainer">
                <Row className="loginDialog">
                    <Tabs defaultActiveKey={"login"} id="login-tabs" className="mb-3">
                        <Tab eventKey="login" title={loginTitle}>
                            <Form className="loginContainer">
                                <h3>Log in</h3>
                                <input placeholder="mail adresi"></input>
                                <input placeholder="sifre"></input>
                            </Form>
                        </Tab>
                        <Tab eventKey="signUp" title={signUpTitle}>
                        <Row className="loginContainer">
                                <h3>Sign Up</h3>
                                <input placeholder="mail adresi"></input>
                                <input placeholder="sifre"></input>
                            </Row>
                        </Tab>
                    </Tabs>
                    
                </Row>
            </Container>
        </Fragment>
    );
}