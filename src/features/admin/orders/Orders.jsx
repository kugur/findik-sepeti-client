import { useInfinityScrollFetchData } from "app/hooks/dataFetchingHooks";
import { OrderTemplate } from "./OrderTemplate";
import { ComboBox } from "components/ComboBox";
import httpClientWrapper from "components/Common/HttpClientWrapper";
import { Button } from "react-bootstrap";
import { useState } from "react";

const Orders = function () {
  const orderStatus = [
    { id: "ORDER_CREATED", name: "ORDER_CREATED", key: "ORDER_CREATED" },
    { id: "PLACE_ORDERED", name: "PLACE_ORDERED", key: "PLACE_ORDERED" },
    { id: "INVALID_ORDER", name: "INVALID_ORDER", key: "INVALID_ORDER" },
    { id: "FAILED_PAYMENT", name: "FAILED_PAYMENT", key: "FAILED_PAYMENT" },
  ];

  const filters = [{ id: "all", name: "Hepsi", key: "all" }, ...orderStatus];
  const createFilter = function(filter) {
    if (filter.id === "all") return [];
    return [{name:"status", value: filter.key, operation: "EQUAL"}]
  };
  const [currentFilter, setCurrentFilter] = useState(filters[0]);
  const [inProgress, orders, setOrders] = useInfinityScrollFetchData(
    "/orderAll",
    5,
    "DESC,id",
    createFilter(currentFilter)
  );

  const setOrderStatus = function (id, status) {
    setOrderValue(id, "newStatus", status);
  };

  const setOrderValue = function (orderId, key, value) {
    setOrders((orders) =>
      orders.map((order) => {
        if (order.id === orderId) {
          let updatedOrder = { ...order };
          updatedOrder[key] = value;
          return updatedOrder;
        } else {
          return order;
        }
      })
    );
  };

  const handleStatusChange = function (orderId, selectedStatus) {
    console.log("orderId: {} , selectedStatus: {} ", orderId, selectedStatus);
    setOrderStatus(orderId, selectedStatus.key);
  };

  const handleApproved = function (e, order) {
    e.preventDefault();
    const paramMap = new Map();
    paramMap.set("status", order.newStatus);

    httpClientWrapper.put(
      "/orderStatus/" + order.id,
      null,
      function (response) {
        console.log("order status  updated response::: {} ", response);
        setOrderValue(order.id, "status", order.newStatus);
        setOrderValue(order.id, "newStatus", null);
      },
      function (error) {
        console.log("order status  update error:: ", error);
        setOrderValue(order.id, "newStatus", null);
      },
      paramMap
    );
  };

  const handleCanceled = function (e, order) {
    e.preventDefault();
    setOrderStatus(order.id, null);
  };

  const orderHtml = orders.map((order) => {
    return (
      <OrderTemplate order={order}>
        <>
          <ComboBox
            defaultItems={orderStatus}
            value={order.newStatus ? order.newStatus : order.status}
            onChange={(selectedItem) => {
              handleStatusChange(order.id, selectedItem);
            }}
          ></ComboBox>
          {order.newStatus ? (
            <>
              <Button onClick={(e) => handleApproved(e, order)}>OK</Button>
              <Button onClick={(e) => handleCanceled(e, order)}>CANCEL</Button>
            </>
          ) : (
            <></>
          )}
        </>
      </OrderTemplate>
    );
  });

  return (
    <div className="orderContainer">
      <>
        <div>
          <ComboBox
            defaultItems={filters}
            value={currentFilter.name}
            onChange={(item) => {
              setCurrentFilter(item);
            }}
          ></ComboBox>
        </div>
        {orderHtml}
      </>
    </div>
  );
};

export { Orders };
