import { Tab } from "bootstrap";
import React, { Fragment, useState, useContext } from "react";
import { Container, Row, Input, TabContainer, Tabs, Form, Label, Button } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { UserContext } from "app/UserContext";
import httpClientWrapper from "components/Common/HttpClientWrapper";

export const Login = () => {
    const { user, setUser } = useContext(UserContext);

    const navigate = useNavigate();
    const [username, setUsername] = useState("ugur");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [repeatedPassword, setRepeatedPassword] = useState("");
    const [address, setAddress] = useState("");
    const [validated, setValidated] = useState(false);

    const loginTitle = "login";
    const signUpTitle = "Sign Up";

    const login = (e) => {
        e.preventDefault();
        console.log("process env ::", "http://" + process.env.REACT_APP_SERVER_URL);
        httpClientWrapper.login(username, password,
            function (data) {
                setUser(data);
                navigate('/');
            },
            function (error) {
                setValidated(false);
            });
        // const credentials = btoa(`${username}:${password}`);
        // fetch("http://" + process.env.REACT_APP_SERVER_URL + "/users", {
        //     method: 'GET',
        //     credentials: 'include',
        //     headers: {
        //         'Access-Control-Allow-Origin': 'localhost:8080, localhost:3000',
        //         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
        //         'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Accept, Authorization, X-Requested-With',
        //         'Authorization': `Basic ${credentials}`
        //     },
        // })
        //     .then(function (response) {

        //         if (response.status === 200) {
        //             console.log("resonse :: ", response);
        //             return response.json();
        //         } else if (response.status === 403) {
        //             // Handle error case
        //             console.log("exceoption occurred while fetching products");
        //             setValidated(false);
        //         } else {
        //             setValidated(false);
        //         }
        //     })
        //     .then(function (data) {
        //         // Do something with the data, like store it in a local variable
        //         if (data) {
        //             console.log(`Response body ${JSON.stringify(data)}`);
        //             setUser(data);
        //             // navigate('/',  {state: { userInfo: data } });
        //             navigate('/');
        //         }
        // })
    };

    const signUp = (event) => {
        // e.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true);

        // if (!username || !lastName || !password || !repeatedPassword || !address || password !== repeatedPassword) {
        //     setValidated(false);
        //     return;
        // }

        // httpClientWrapper.post("/users", {
        //     "username": username,
        //     "password": password,
        //     "firstName": name,
        //     "lastName": lastName,
        //     "address": address
        // })
        // console.log("SignUp button clicked.");

        // fetch("http://" + process.env.REACT_APP_SERVER_URL + "/users", {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin': 'localhost:8080, localhost:3000',
        //         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
        //         'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Accept, Authorization, X-Requested-With',
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: repeatedPassword
        //     })
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log("Successfully sign up. ");
        //     })
        //     .catch(error => {
        //         console.log(`Failled to sign up. ${error}`);
        //     });
    };

    const loginSchema = yup.object().shape({
        email: yup.string().required(),
        password: yup.string().required()
    });

    return (
        <Fragment>
            <Container className="loginContainer">
                <Row className="loginDialog">
                    <Tabs defaultActiveKey={"login"} id="login-tabs" className="mb-3">
                        <Tab eventKey="login" title={loginTitle}>
                            <Formik
                                validationSchema={loginSchema}
                                onSubmit={login}
                                initialValues={{
                                    email: "",
                                    password: ""
                                }}
                            >
                                {({ handleChange }) => (
                                    <Form noValidate className="loginContainer">
                                        <Form.Group className="mb-3 loginForm" controlId="formBasicEmail">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control required name="email" type="email" placeholder="Enter email" />
                                            <Form.Control.Feedback type="invalid">
                                                Email adresi zorunlu
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                        <Form.Group className="mb-3 loginForm" controlId="formBasicPassword">
                                            <Form.Label>Password</Form.Label>
                                            <Form.Control name="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                                        </Form.Group>
                                        <Button variant="primary" onClick={e => login(e)} type="submit">
                                            Log In
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Tab>
                        <Tab eventKey="signUp" title={signUpTitle}>
                            <Form noValidate validated={validated} className="loginContainer" onSubmit={signUp}>
                                <Form.Group className="mb-3 loginForm" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required value={name} onChange={e => setName(e.target.value)} placeholder="name"></Form.Control>
                                    <Form.Control.Feedback type="invalid">Isim Zorunlu</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3 loginForm" controlId="formBasicName">
                                    <Form.Label>LastName</Form.Label>
                                    <Form.Control required value={lastName} onChange={e => setLastName(e.target.value)} placeholder="Last Name"></Form.Control>
                                </Form.Group>
                                <Form.Group className="mb-3 loginForm" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control required type="email" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter email" />
                                </Form.Group>
                                <Form.Group className="mb-3 loginForm" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3 loginForm" controlId="formBasicPasswordRepeat">
                                    <Form.Label>Password Tekrar</Form.Label>
                                    <Form.Control required type="password" value={repeatedPassword} onChange={e => setRepeatedPassword(e.target.value)} placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-1 loginForm" controlId="formBasicAddress">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control required as="textarea" rows={3} value={address} onChange={e => setAddress(e.target.value)} placeholder="Address"></Form.Control>
                                </Form.Group>
                                <Button variant="primary" onClick={e => signUp(e)} type="submit">
                                    Sign Up
                                </Button>
                            </Form>
                        </Tab>
                    </Tabs>
                    <div>
                        <a href="http://localhost:8080/oauth2/authorization/google">Login by google Link</a>
                    </div>
                </Row>
            </Container>
        </Fragment>
    );
}