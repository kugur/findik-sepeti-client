import React, { Fragment } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom"
import findikBackground from '../../assets/imgs/deneme.jpg'
import { TopNavigation } from "../../components/topNavigationBar";
import {Footer} from "../../layouts/Footer";

export const Detail = (params) => {
    const { product, cost } = useParams();

    console.log(JSON.stringify(product));
    console.log(JSON.stringify(cost));
    return (
        <Fragment>
            <div className="detailWrapper">
            <TopNavigation></TopNavigation>
            <Container className="detailCotainer">
                <div className="imageContainer"></div>
                <div className="infoContainer"></div>
            </Container>
            <Footer></Footer>
            </div>
        </Fragment>
    );
}
