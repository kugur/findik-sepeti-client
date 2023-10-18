import { Img } from "components/Img";

const OrderTemplate = function ({ order, type, children }) {
    console.log("order::: {} ", JSON.stringify(order));
    const items = order.orderItems.map((orderItem) => {
      return (
        <div className="productContainer">
          <Img src={orderItem.product.imageUrl} className="imgWrapper"></Img>
          <div className="productDesc">
            {orderItem.product.name}
            <br></br>
            {orderItem.product.price} TL
            <br></br>x {orderItem.quantity}
          </div>
        </div>
      );
    });
  
    return (
      <div className="orderSection">
        <div className="orderHeader">
          <div className="headerCell">
            <h5 className="cellTitle">SIPARIS TARIHI</h5>
            <div className="cellValue">100tl</div>
          </div>
          <div className="headerCell">
            <h5 className="cellTitle">ALICI</h5>
            <div className="cellValue">
              {order.shipping && order.shipping.name}
            </div>
          </div>
          <div className="headerCell">
            <h5 className="cellTitle">SIPARIS NUMARASI</h5>
            <div className="cellValue">{order.id}</div>
          </div>
          <div className="headerCell">
            <h5 className="cellTitle">TOPLAM TUTAR</h5>
            <div className="cellValue">{order.total}</div>
          </div>
        </div>
        <div className="orderBody">
          <div className="productList">{items}</div>
  
          <div className="buttonList">
            {children}
          </div>
        </div>
      </div>
    );
  };
  
  export { OrderTemplate };