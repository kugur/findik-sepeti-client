import {memo} from "react";
import Card  from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
import { CardImage } from "components/CardImg";

export const CustomCard = memo((props) => {
    console.log("Custom card re-rendered. id: " + props.id);
    const id = props.id;
    const navigate = useNavigate();
    const onClick = (e) => {
        navigate("/product/" + id);
    }
    
    return (
        <Card className="findikCard img-hover-zoom--quick-zoom" onClick={onClick}>
            <div className="cardImage">
            <CardImage variant="top" src={props.image} />
            </div>
            <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>
                    {props.id}
                </Card.Text>
                <div className="buttonPriceContainer">
                <Button variant="primary">Satin Al</Button>
                <p className="price">{props.price} TL</p>
                </div>
            </Card.Body>
        </Card>
    );
});


