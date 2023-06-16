import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useFetchData } from "app/hooks/dataFetchingHooks";
import { PaginationButtons } from "components/Pagination/Pagination";
import { Img } from "components/Img";

function Prodcuts(props) {
    console.log("[Products] called.");
  const [pageNumber, setPageNumber] = useState(0);
  const navigate = useNavigate();
  const [data, pageModel, isFetching] = useFetchData(
    "/products",
    5,
    pageNumber,
    "Id,Desc"
  );

  return (
    <Container className="adminProducts">
      <Container>
        <Row className="productTitle" key="productTitle">
          <Button className="newProduct" onClick={() => navigate("/admin/product/new")}>Yeni Urun</Button>
        </Row>
        {data &&
          data.map((product) => (
            <Row className="productRow" key={"product-" + product.id}>
              <Col>{product.id}</Col>
              <Col>
                <Img className="imageContainer" src={"findik.jpg"}></Img>
                
              </Col>
              <Col>{product.name}</Col>
              <Col>{product.price}</Col>
              <Col>{product.category}</Col>
              <Col>
                <Button onClick={() => navigate("/admin/product/edit/" + product.id)}>Edit</Button>
              </Col>
              <Col>
                <Button>Delete</Button>
              </Col>
            </Row>
          ))}
      </Container>
      <PaginationButtons
        currentPageNumber={pageNumber}
        maxPageNumber={pageModel.totalPages}
        onChange={setPageNumber}
      ></PaginationButtons>
    </Container>
  );
}

export { Prodcuts };
