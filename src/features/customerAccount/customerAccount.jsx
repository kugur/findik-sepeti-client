import { TopNavigation } from "components/topNavigationBar";
import { Footer } from "layouts/Footer";
import { Fragment, React, useEffect } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { useContext } from "react";
import { UserContext, isPreUser } from "app/UserProvider";
import { useState } from "react";
import httpClientWrapper from "components/Common/HttpClientWrapper";
import { Gender } from "helpers/Genders";
import { Toaster } from "components/Common/Toaster";

const States = {
  NEW: "New",
  UPDATE: "Update",
};

const CustomerAccount = (params) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [currentState, setCurrentState] = useState(
    isPreUser(user) ? States.NEW : States.UPDATE
  );
  console.log(isPreUser);
  console.log(`[CustomerAccount] params :: ${params}`);

  const updateUser = (values) => {
    console.log(`Submitted values ${JSON.stringify(values)}`);
    values.username = values.email;

    httpClientWrapper.put(
      "/users",
      values,
      function (response) {
        console.log(`Users update response ${response}`);
        setUser(response);
        Toaster.info("Basarili sekilde guncellendi");
        navigate("/");
      },
      function (error) {
        Toaster.error("Guncellenemedi, hata oldu!");
        console.log(`Users update error ${error}`);
      }
    );
  };

  useEffect(() => {
    console.log(`[customerAccount] ${user.email}`);
    setCurrentState(isPreUser(user) ? States.NEW : States.UPDATE);
  }, [user.email]);

  return (
    <Fragment>
      <div className="customerAccount">
        <TopNavigation></TopNavigation>
        <Container className="customerContainer">
          <h2 className="customerTitle">
            {currentState === States.NEW ? "Kaydi tamamla" : "Kisisel Bilgiler"}
          </h2>
          <Formik
            enableReinitialize
            initialValues={{
              email: user.email || "",
              firstName: user.firstName || "",
              lastName: user.lastName || "",
              address: user.address || "",
              gender: user.gender,
            }}
            onSubmit={updateUser}
          >
            {({ handleSubmit, handleChange, handleBlur, values }) => (
              <Form onSubmit={handleSubmit}>
                <fieldset>
                  <Form.Group className="customerGroup" controlId="name">
                    <Form.Label>Isim</Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      className="inputArea"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.firstName}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="customerGroup" controlId="lastName">
                    <Form.Label>Soyad</Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      className="inputArea"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                    ></Form.Control>
                  </Form.Group>

                  <div key="inline-checkbox">
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
                  </div>

                  <Form.Group className="customerGroup" controlId="email">
                    <Form.Label>E-posta adresi</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="inputArea"
                      value={values.email}
                      disabled
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group className="customerGroup" controlId="address">
                    <Form.Label>Adres</Form.Label>
                    <Form.Control
                      name="address"
                      as="textarea"
                      row={3}
                      className="inputArea"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.address}
                    ></Form.Control>
                  </Form.Group>
                </fieldset>
                <Button type="submit">
                  {currentState === States.NEW ? "Olustur" : "Guncelle"}
                </Button>
              </Form>
            )}
          </Formik>
        </Container>
        <Footer></Footer>
      </div>
    </Fragment>
  );
};

export { CustomerAccount, States };
