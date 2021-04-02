import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const Checkout = () => {
    const {id} = useParams();
    const [paint, setPaint] = useState({});
    console.log(id)
    useEffect(() => {
        fetch(`https://sheltered-fjord-53570.herokuapp.com/checkout/${id}`)
        .then(res => res.json())
        .then(data => setPaint(data))
    }, [id])
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