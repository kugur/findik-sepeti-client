import React, { Fragment, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom"
import findikBackground from 'assets/imgs/deneme.jpg'
import { TopNavigation } from "../../components/topNavigationBar";
import {Footer} from "../../layouts/Footer";
import { NumberInput } from "components/NumberInput";

export const Detail = (params) => {
    const { product, cost } = useParams();
    const [productCount, setProductCount] = useState(1);

    const onProductCountChange = function(count) {
        setProductCount(count > 1 ? count : 1);
    }

    console.log("produdctCount :: " + productCount);
    console.log("setProduct:: " + setProductCount);
    return (
        <Fragment>
            <div className="detailContainer">
            <TopNavigation></TopNavigation>
            <Container className="detailWrapper">
                <div className="imageContainer">
                    <img src={findikBackground} alt={"urun resmi"}/>
                </div>
                <div className="infoContainer">
                    <h2>Yas Findik</h2>
                    <p>Tarladan toplanmis, Giresun findigi</p>
                    <p>Ex consectetur nisi sit non. Duis enim do ullamco voluptate esse qui quis minim sint eiusmod voluptate. Elit Lorem do ea labore enim veniam officia nostrud irure dolore nostrud sit esse. Laboris esse proident sint deserunt magna ex.</p>
                    <div className="buttonWrapper">
                        <NumberInput value={productCount} onChange={onProductCountChange} deneme="anana"></NumberInput>
                        <Button className="addCart">Sepete Ekle</Button>
                    </div>
                </div>
            </Container>
            <Footer></Footer>
            </div>
        </Fragment>
    );
}
