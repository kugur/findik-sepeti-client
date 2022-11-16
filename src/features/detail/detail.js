import React, { Fragment } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom"
import findikBackground from 'assets/imgs/deneme.jpg'
import { TopNavigation } from "../../components/topNavigationBar";
import {Footer} from "../../layouts/Footer";

export const Detail = (params) => {
    const { product, cost } = useParams();

    console.log(JSON.stringify(product));
    console.log(JSON.stringify(cost));
    return (
        <Fragment>
            <div className="detailContainer">
            <TopNavigation></TopNavigation>
            <Container className="detailWrapper">
                <div className="imageContainer">
                    <img src={findikBackground}/>
                </div>
                <div className="infoContainer">
                    <h2>Yas Findik</h2>
                    <p>Tarladan toplanmis, Giresun findigi</p>
                </div>
            </Container>
            <Footer></Footer>
            </div>
        </Fragment>
    );
}
