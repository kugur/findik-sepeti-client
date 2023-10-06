import { TopNavigation } from "components/topNavigationBar";
import { Order } from "./Order";
import { Footer } from "layouts/Footer";
import { Fragment, React, useEffect, useState } from "react";
import findikImage from "assets/imgs/deneme.jpg";
import { Button } from "react-bootstrap";
import httpClientWrapper from "components/Common/HttpClientWrapper";

export const Orders = (params) => {
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        console.log(`[Order] params: ${params}`);
        httpClientWrapper.get("/order", function(response) {
            console.log("order successfull response {} ", response);
            setOrders(response);
        }, function(error) {
            console.log("order errors:  {} ", error);
        })
    }, []);

    const ordersHtml = orders && orders.content ? orders.content.map(order => {
        return ( <Order order={order}></Order>)
    }) : <></>;
    return (
        <Fragment>
            <div className="orderContainer">
                <TopNavigation></TopNavigation>
                <div className="orderWrapper">

                    <div className="orderSectionWrapper">
                        <h1>Siparisler</h1>
                        {ordersHtml}
                        {/* <div className="orderSection">
                            <div className="orderHeader"></div>
                            <div className="orderBody"></div>
                        </div>

                        <div className="orderSection">
                            <div className="orderHeader"></div>
                            <div className="orderBody"></div>
                        </div> */}
                       

                    </div>

                    <Footer className="footer"></Footer>
                </div>

            </div>
        </Fragment>
    )
}
