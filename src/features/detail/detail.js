import React, { Fragment, useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom"
import findikBackground from 'assets/imgs/deneme.jpg'
import { TopNavigation } from "../../components/topNavigationBar";
import { Footer } from "../../layouts/Footer";
import { NumberInput } from "components/NumberInput";
import httpClientWrapper from "components/Common/HttpClientWrapper";

export const Detail = (params) => {
    const { product, cost } = useParams();
    const [productCount, setProductCount] = useState(1);

    const onProductCountChange = function (count) {
        setProductCount(count > 1 ? count : 1);
    }

    console.log("produdctCount :: " + productCount);
    console.log("setProduct:: " + setProductCount);

    // const getCookie = (name) => {
    //     var value = "; " + document.cookie;
    //     var parts = value.split("; " + name + "=");
    //     if (parts.length == 2) return parts.pop().split(";").shift();
    // };
    const addCart = () => {
        httpClientWrapper.post("/products", {
            price: 33,
            name: "deneme"
        });
        // fetch("http://" + process.env.REACT_APP_SERVER_URL + "/products", {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //         'Access-Control-Allow-Origin': 'localhost:8080, localhost:3000',
        //         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH',
        //         'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Accept, Authorization, X-Requested-With',
        //         'X-XSRF-TOKEN': getCookie("XSRF-TOKEN"),
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         price: 33,
        //         name: "deneme"
        //     })
        // })
        //     .then(function (response) {
        //         if (response.status === 200) {
        //             console.log("resonse :: ", response);
        //             return response.json();
        //         } else {
        //             // Handle error case
        //             console.log("exceoption occurred while fetching products");
        //         }
        //     })
        //     .then(function (data) {
        //         // Do something with the data, like store it in a local variable
        //         console.log("response body ", data);
        //     });
    };

    return (
        <Fragment>
            <div className="detailContainer">
                <TopNavigation></TopNavigation>
                <Container className="detailWrapper">
                    <div className="imageContainer">
                        <img src={findikBackground} alt={"urun resmi"} />
                    </div>
                    <div className="infoContainer">
                        <h2>Yas Findik</h2>
                        <p>Tarladan toplanmis, Giresun findigi</p>
                        <p>Ex consectetur nisi sit non. Duis enim do ullamco voluptate esse qui quis minim sint eiusmod voluptate. Elit Lorem do ea labore enim veniam officia nostrud irure dolore nostrud sit esse. Laboris esse proident sint deserunt magna ex.</p>
                        <div className="buttonWrapper">
                            <NumberInput value={productCount} onChange={onProductCountChange} deneme="anana"></NumberInput>
                            <Button onClick={e => addCart()} className="addCart">Sepete Ekle</Button>
                        </div>
                    </div>
                </Container>
                <Footer></Footer>
            </div>
        </Fragment>
    );
}
