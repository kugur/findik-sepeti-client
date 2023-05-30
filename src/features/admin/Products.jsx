import { useFetchData } from "app/hooks/dataFetchingHooks";
import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { PaginationButtons } from "components/Pagination/Pagination";
import { Img } from "components/Img";

function Prodcuts(props) {
    console.log("[Products] called.");
  const [pageNumber, setPageNumber] = useState(0);
  const [data, pageModel, isFetching] = useFetchData(
    "/products",
    5,
    pageNumber,
    "Id,Desc"
  );

  return (
    <Container className="adminProducts">
      <Container>
        {data &&
          data.map((product) => (
            <Row className="productRow" key={"product-" + product.id}>
              <Col>{product.id}</Col>
              <Col>
                <Img src={"/src/assets/imgs/findik.jpg"}></Img>
                
              </Col>
              <Col>{product.name}</Col>
              <Col>{product.price}</Col>
              <Col>{product.catogary}</Col>
              <Col>
                <Button>Edit</Button>
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
