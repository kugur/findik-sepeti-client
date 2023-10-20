import { Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import { Prodcuts } from "./product/Products";
import { Categories } from "./categories/Categories";
import { Orders } from "./orders/Orders";

const AdminTabs = function () {
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="products">
      <Row className="tabs">
        <Col sm={3} className="split">
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link eventKey="products">Urunler</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="categories">Katogoriler</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="orders">Siparisler</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
            <Tab.Pane eventKey="products">
              <Prodcuts></Prodcuts>
            </Tab.Pane>
            <Tab.Pane eventKey="categories">
              <Categories></Categories>
            </Tab.Pane>
            <Tab.Pane eventKey="orders">
              <Orders></Orders>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export { AdminTabs };
