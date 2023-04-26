import { Tab } from "bootstrap";
import React, { Fragment, useState, useContext } from "react";
import { SHA256 } from "crypto-js";
import { UserContext } from "app/UserProvider";

import {
  Container,
  Row,
  Input,
  TabContainer,
  Tabs,
  Form,
  Label,
  Button,
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "app/UserProvider";
import httpClientWrapper from "components/Common/HttpClientWrapper";
import { Gender } from "constants/Genders";
import { Toaster } from "components/Common/Toaster";

const States = {
  LOGIN: "login",
  SIGNUP: "signUp",
};

const Titles = {
  LOGIN: "login",
  SIGNUP: "Sign Up",
};

const Login = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(States.LOGIN);

  const encodePassword = (password) => {
    return SHA256(password).toString();
  };

  const login = (formData) => {
    // e.preventDefault();
    console.log(
      "login called. process env ::",
      "http://" + process.env.REACT_APP_SERVER_URL
    );
    httpClientWrapper.login(
      formData.email,
      encodePassword(formData.password),
      function (data) {
        setUser(data);
        navigate("/");
      },
      function (error) {
        console.error(
          `[Login] Exception occured while fetching login: ${error}`
        );
        Toaster.error("Yanlis kullanici veya sifre");
      }
    );
  };

  const signUp = (formData) => {
    console.log(formData);
    httpClientWrapper.post(
      "/users",
      { ...formData, password: encodePassword(formData.password) },
      function (response) {
        console.log(`signup response ${response}`);
        setActiveTab("login");
      },
      function (error) {
        console.error(`signUp error: ${error}`);
      }
    );
  };

  const loginSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const signUpSchema = yup.object().shape({
    name: yup.string(),
    lastName: yup.string(),
    password: yup
      .string()
      .required("Password alani zorunlu")
      .min(6, "minimum uzunlugu 6 olmali"),
    repeatedPassword: yup
      .string()
      .required("Password tekrari zorunlu alan")
      .oneOf([yup.ref("password")], "password ile match olmali")
      .min(6, "minimum uzunlugu 6  olmali"),
    username: yup
      .string()
      .email("email olmasi lazim")
      .required("mail alani zorunlu"),
    address: yup.string().required("adres alani zorunlu"),
  });

  const loginForm = (
    <Formik
      validationSchema={loginSchema}
      onSubmit={login}
      initialValues={{
        email: "",
        password: "",
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
        submitCount,
        resetForm,
      }) => (
        <Form noValidate onSubmit={handleSubmit} className="loginContainer">
          <Form.Group className="mb-3 loginForm" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="email"
              type="email"
              onChange={handleChange}
              value={values.email}
              isInvalid={errors.email}
              placeholder="Enter email"
            />

            <Form.Control.Feedback type="invalid">
              Email adresi zorunlu
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 loginForm" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.password}
              placeholder="Password"
            />
            <Form.Control.Feedback type="invalid">
              password adresi zorunlu
            </Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form>
      )}
    </Formik>
  );

  const signUpForm = (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        password: "",
        repeatedPassword: "",
        username: "",
        address: "",
        gender: "",
      }}
      validationSchema={signUpSchema}
      onSubmit={signUp}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        submitCount,
        values,
        errors,
        touched,
      }) => (
        <Form noValidate className="loginContainer" onSubmit={handleSubmit}>
          <Form.Group className="mb-3 loginForm" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.firstName}
              placeholder="name"
            ></Form.Control>
            <Form.Control.Feedback type="invalid">
              Isim Zorunlu
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3 loginForm" controlId="formBasicName">
            <Form.Label>LastName</Form.Label>
            <Form.Control
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={errors.lastName}
              placeholder="Last Name"
            ></Form.Control>
          </Form.Group>
          <Form.Group className="mb-3 loginForm" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              name="username"
              type="email"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.username && errors.username}
              placeholder="Enter email"
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group key="inline-checkbox" className="mb-3 loginForm" >
            <Form.Label className="genderLabel">Cinsiyet: </Form.Label>
            <Form.Check
              inline
              name="gender"
              type="radio"
              id="male"
              label="Erkek"
              value={Gender.Male}
              checked={Gender.Male === values.gender}
              onChange={handleChange}
            ></Form.Check>
            <Form.Check
              inline
              name="gender"
              type="radio"
              id="female"
              value={Gender.Female}
              checked={Gender.Female === values.gender}
              label="Kadin"
              onChange={handleChange}
            ></Form.Check>
          </Form.Group>
          <Form.Group className="mb-3 loginForm" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.password && errors.password}
              placeholder="Password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group
            className="mb-3 loginForm"
            controlId="formBasicPasswordRepeat"
          >
            <Form.Label>Password Tekrar</Form.Label>
            <Form.Control
              name="repeatedPassword"
              type="password"
              value={values.repeatedPassword}
              isInvalid={
                touched.password &&
                touched.repeatedPassword &&
                errors.repeatedPassword
              }
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Password"
            />
            <Form.Control.Feedback type="invalid">
              {errors.repeatedPassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-1 loginForm" controlId="formBasicAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              as="textarea"
              rows={3}
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.address && errors.address}
              placeholder="Address"
            ></Form.Control>
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      )}
    </Formik>
  );

  return (
    <Fragment>
      <Container className="loginContainer">
        <Row className="loginDialog">
          <Tabs
            defaultActiveKey={activeTab}
            activeKey={activeTab}
            onSelect={(selectedTab) => setActiveTab(selectedTab)}
            id="login-tabs"
            className="mb-3"
          >
            <Tab eventKey="login" title={Titles.LOGIN}>
              {loginForm}
            </Tab>
            <Tab eventKey="signUp" title={Titles.SIGNUP}>
              {signUpForm}
            </Tab>
          </Tabs>
          <div>
            <a href="http://localhost:8080/oauth2/authorization/google">
              Login by google Link
            </a>
          </div>
        </Row>
      </Container>
    </Fragment>
  );
};

export { Login, States };
