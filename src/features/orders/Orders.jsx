import { TopNavigation } from "components/topNavigationBar";
import { Order } from "./Order";
import { Footer } from "layouts/Footer";
import { Fragment, React } from "react";
import { useInfinityScrollFetchData } from "app/hooks/dataFetchingHooks";

export const Orders = () => {
  const [inprogress, orders] = useInfinityScrollFetchData(
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

  if (inprogress) return (<div> Loadding...</div>)
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
