import { Row, Col } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import { Prodcuts } from "./product/Products";
import { Categories } from "./categories/Categories";

const AdminTabs = function () {
  
    function Tab1Content() {
        return (
          <div className="flex-grow-1">
            <h1>Tab 1 Content</h1>
            <p>This is the content for Tab 1.</p>
          </div>
        );
      }
      
      function Tab2Content() {
        return (
          <div className="flex-grow-1">
            <h1>Tab 2 Content</h1>
            <p>This is the content for Tab 2.</p>
          </div>
        );
      }

      return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="products" >
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
                <Nav.Item>
                  <Nav.Link eventKey="stock">Stoklar</Nav.Link>
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
                  <Tab2Content/>
                </Tab.Pane>
                <Tab.Pane eventKey="stock">
                  <Tab2Content/>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      );
};

export { AdminTabs };
