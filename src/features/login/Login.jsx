import { Tab } from "bootstrap";
import React, { Fragment, useState, useContext } from "react";
import { SHA256 } from "crypto-js";
import { UserContext } from "app/UserProvider";

import {
  Container,
  Row,
  Tabs,
  Form,
  Button,
} from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
// import { UserContext } from "app/UserProvider";
import httpClientWrapper from "components/Common/HttpClientWrapper";
import { Gender } from "constants/Genders";
import { Toaster } from "components/Common/Toaster";
import { TopNavigation } from "components/topNavigationBar";

const States = {
  LOGIN: "login",
  SIGNUP: "signUp",
};

const Titles = {
  LOGIN: "Giriş",
  SIGNUP: "Kayıt Ol",
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
            Giriş
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
            Kayıt Ol
          </Button>
        </Form>
      )}
    </Formik>
  );

  return (
    <Fragment>
      <TopNavigation></TopNavigation>
      
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
          <div className="googleContainer">
           
            <a href="http://localhost:8080/oauth2/authorization/google">
            <div id="customBtn" class="customGPlusSignIn">
				      <span class="icon"><svg width="24" height="25" viewBox="0 0 24 25"><g fill="none"><path fill="#4285F4" d="M23.989 12.511c0-1.006-.082-1.74-.259-2.502H12.24v4.542h6.744c-.136 1.129-.87 2.828-2.502 3.97l-.023.153 3.633 2.814.252.026c2.312-2.136 3.645-5.277 3.645-9.003"></path><path fill="#34A853" d="M12.24 24.478c3.304 0 6.078-1.088 8.104-2.964l-3.862-2.992c-1.034.72-2.42 1.224-4.243 1.224-3.236 0-5.983-2.135-6.963-5.086l-.143.012-3.778 2.924-.05.137c2.013 3.998 6.147 6.745 10.934 6.745"></path><path fill="#FBBC05" d="M5.276 14.66c-.258-.762-.408-1.578-.408-2.42 0-.844.15-1.66.395-2.422l-.007-.162-3.825-2.97-.126.059C.476 8.405 0 10.267 0 12.239s.476 3.835 1.305 5.494l3.971-3.073"></path><path fill="#EB4335" d="M12.24 4.732c2.297 0 3.847.993 4.731 1.823l3.455-3.373C18.304 1.21 15.544 0 12.239 0 7.452 0 3.32 2.747 1.305 6.745l3.958 3.073c.993-2.95 3.74-5.086 6.976-5.086"></path></g></svg></span>
				      <span class="buttonText">Google</span>
				    </div>
              
            </a>
          </div>
        </Row>
      </Container>
    </Fragment>
  );
};

export { Login, States };
