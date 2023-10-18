import { TopNavigation } from "components/topNavigationBar";
import { Order } from "./Order";
import { Footer } from "layouts/Footer";
import { Fragment, React, useEffect, useState } from "react";
import findikImage from "assets/imgs/deneme.jpg";
import { Button } from "react-bootstrap";
import { useInfinityScrollFetchData } from "app/hooks/dataFetchingHooks";
import httpClientWrapper from "components/Common/HttpClientWrapper";

export const Orders = (params) => {
  const [inProgress, orders] = useInfinityScrollFetchData(
    "/order",
    5,
    "DESC,id",
    ""
  );

  const ordersHtml = orders ? (
    orders.map((order) => {
      return <Order order={order}></Order>;
    })
  ) : (
    <></>
  );
  return (
    <Fragment>
      <div className="orderContainer">
        <TopNavigation></TopNavigation>
        <div className="orderWrapper">
          <div className="orderSectionWrapper">
            <h1>Siparisler</h1>
            {ordersHtml}
          </div>

          <Footer className="footer"></Footer>
        </div>
      </div>
    </Fragment>
  );
};
