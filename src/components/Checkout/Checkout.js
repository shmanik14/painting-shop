import React, { useState, useEffect, useContext } from 'react';
import { paintContext } from '../../App';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const Checkout = () => {
    const [loggedInUser, setLoggedInUser] = useContext(paintContext);
    const {id} = useParams();
    const [paint, setPaint] = useState({});
    const eventData = {
        pName: paint.pName,
        price: paint.price,
        weight: paint.weight,
        date: paint.date,
        image: paint.image
    }
    useEffect(() => {
        fetch(`https://sheltered-fjord-53570.herokuapp.com/checkout/${id}`)
        .then(res => res.json())
        .then(data => setPaint(data))
    }, [id])
    const newOrder = {...loggedInUser, ...eventData}
        const url = `https://sheltered-fjord-53570.herokuapp.com/addOrder`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        })
        .then(res => {
            console.log('order');
        })
    return (
        <div>
            <div className="page-header">
                <h1>CheckOut</h1>
            </div>
            <Container>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>{paint.pName}</td>
                    <td>1</td>
                    <td>{paint.price}</td>
                    </tr>
                    
                    <tr>
                    <td>Total</td>
                    <td></td>
                    <td>{paint.price}</td>
                    </tr>
                </tbody>
            </Table>
            </Container>
        </div>
    );
};

export default Checkout;