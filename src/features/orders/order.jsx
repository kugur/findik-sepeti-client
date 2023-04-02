import { TopNavigation } from "components/topNavigationBar";
import { Footer } from "layouts/Footer";
import { Fragment, React, useEffect } from "react";
import findikImage from "assets/imgs/deneme.jpg";
import { Button } from "react-bootstrap";

export const Order = (params) => {
    useEffect(() => {
        console.log(`[Order] params: ${params}`);
    })
    return (
        <Fragment>
            <div className="orderContainer">
                <TopNavigation></TopNavigation>
                <div className="orderWrapper">

                    <div className="orderSectionWrapper">
                        <h1>Siparisler</h1>
                        <div className="orderSection">
                            <div className="orderHeader"></div>
                            <div className="orderBody"></div>
                        </div>

                        <div className="orderSection">
                            <div className="orderHeader"></div>
                            <div className="orderBody"></div>
                        </div>
                        <div className="orderSection">
                            <div className="orderHeader">
                                <div className="headerCell">
                                    <h5 className="cellTitle">SIPARIS TARIHI</h5>
                                    <div className="cellValue">100tl</div>
                                </div>
                                <div className="headerCell">
                                    <h5 className="cellTitle">ALICI</h5>
                                    <div className="cellValue">100tl</div>
                                </div>
                                <div className="headerCell">
                                    <h5 className="cellTitle">SIPARIS NUMARASI</h5>
                                    <div className="cellValue">100tl</div>
                                </div>
                                <div className="headerCell">
                                    <h5 className="cellTitle">TOPLAM TUTAR</h5>
                                    <div className="cellValue">100tl</div>
                                </div>
                            </div>
                            <div className="orderBody">
                                <div className="productContainer">
                                    <img src={findikImage} alt="siparis resmi" className="imgWrapper" />
                                    <div className="productDesc">
                                        Bahce Findik
                                        <br></br>
                                        100tl
                                    </div>
                                </div>
                                <div className="buttonList">
                                    <Button>Fatura</Button>
                                    <Button>Kargo Takip</Button>
                                </div>

                            </div>
                        </div>

                    </div>

                    <Footer className="footer"></Footer>
                </div>

            </div>
        </Fragment>
    )
}
