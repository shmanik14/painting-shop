import React, { useState, useContext, useEffect } from 'react';
import { paintContext } from '../../App';
import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(paintContext);
    const [orderedProducts, setOrderedProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4000/manageProduct?email='+loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => setOrderedProducts(data))
    } , [])
    return (
        <div className="orders">
            <div className="page-header">
                <h1>My Orders</h1>
            </div>
            <Container>
                <div className="summary">
                    <h4>Hello, {loggedInUser.name}</h4>
                    <h6>Your Email Address: {loggedInUser.email}</h6>
                    <p>Total Order: {orderedProducts.length}</p>
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Ordered Date</th>
                        <th>Product Name</th>
                        <th>Weight</th>
                        <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                {
                    orderedProducts.map(paint => 
                    <tr>
                        <td>{paint.date}</td>
                        <td>{paint.pName}</td>
                        <td>{paint.weight}</td>
                        <td>{paint.price}</td>
                    </tr>
                    )
                }
                </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default Orders;