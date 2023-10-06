import { Img } from "components/Img";
import { Button } from "react-bootstrap";

const Order = function({order}) {
    const items = order.orderItems.map(orderItem => {
        return (
            <div className="productContainer">
                <Img localSrc={orderItem.product.imageUrl} className="imgWrapper"></Img>
            {/* <img src={order} alt="siparis resmi" className="imgWrapper" /> */}
            <div className="productDesc">
                Bahce Findik
                <br></br>
                100tl
            </div>
        </div>
        )
    });

    return ( <div className="orderSection">
    <div className="orderHeader">
        <div className="headerCell">
            <h5 className="cellTitle">SIPARIS TARIHI</h5>
            <div className="cellValue">100tl</div>
        </div>
        <div className="headerCell">
            <h5 className="cellTitle">ALICI</h5>
            <div className="cellValue">{order.shipping && order.shipping.name}</div>
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
        {items}
        {/* <div className="productContainer">
            <img src={order} alt="siparis resmi" className="imgWrapper" />
            <div className="productDesc">
                Bahce Findik
                <br></br>
                100tl
            </div>
        </div> */}
        <div className="buttonList">
            <Button>Fatura</Button>
            <Button>Kargo Takip</Button>
        </div>

    </div>
</div>);
}

export {Order};