import { Card } from "react-bootstrap";

function LoadingCustomCard(props) {
  return (
    <Card className="loadingCard img-hover-zoom--quick-zoom">
      <div className="loadingCardImage loadingBackAnimation">
        <Card.Img variant="top" />
      </div>
      <Card.Body>
        <Card.Title className="loadingBackAnimation"></Card.Title>
        <Card.Text className="loadingBackAnimation"></Card.Text>
        <div className="loadingButton loadingBackAnimation"></div>
      </Card.Body>
    </Card>
  );
}

export default LoadingCustomCard;
