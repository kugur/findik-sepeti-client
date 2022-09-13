import React from "react";
import Card  from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

export const CustomCard = (props) => {
    const id = props.id;
    const navigate = useNavigate();
    const onClick = (e) => {
        console.log("Card has been clicked.");
        navigate("/product/" + id);
    }
    
    return (
        <Card className="findikCard img-hover-zoom--quick-zoom" onClick={onClick}>
            <div className="cardImage">
            <Card.Img variant="top" src={props.image} />
            </div>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
}
