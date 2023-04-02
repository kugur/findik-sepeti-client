import {memo} from "react";
import Card  from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

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
            <Card.Img variant="top" src={props.image} />
            </div>
            <Card.Body>
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                    {props.id}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
});


