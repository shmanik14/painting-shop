import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button  from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

const Paint = (props) => {
    const history = useHistory()
    const handleBook = (id) => {
        history.push(`/checkout/${id}`);
    }
    const {_id, pName, price, image} = props.paint
    return (
        <Col xs={6} md={4}>
            <Card>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{pName}</Card.Title>
                </Card.Body>
                <div className="card-bottom">
                    <Card.Link>{price}</Card.Link>
                    <Button onClick={() => handleBook(_id)} variant="primary">Buy Now</Button>
                </div>
            </Card>
        </Col>
    );
};

export default Paint;