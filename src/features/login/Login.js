import { Tab } from "bootstrap";
import React, { Fragment } from "react";
import { Container, Row, Input, TabContainer, Tabs, Form, Labe } from "react-bootstrap";

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
                                <Form.Group className="mb-3 loginForm" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3 loginForm" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                            </Form>
                        </Tab>
                        <Tab eventKey="signUp" title={signUpTitle}>
                            <Form className="loginContainer">
                                <Form.Group className="mb-3 loginForm" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3 loginForm" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" />
                                </Form.Group>
                            </Form>
                        </Tab>
                    </Tabs>
                </Row>
            </Container>
        </Fragment>
    );
}