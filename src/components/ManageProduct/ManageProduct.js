import React, { useState, useContext, useEffect } from 'react';
import { paintContext } from '../../App';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


const ManageProduct = () => {
    const history = useHistory()
    const handleManageProduct = () => {
        history.push('/manageProduct');
    }
    const handleEditProduct = () => {
        history.push('/editProduct');
    }   
    const handleAddProduct = () => {
        history.push('/addProduct');
    }
    const deleteProduct = (id) => {
        fetch(`https://sheltered-fjord-53570.herokuapp.com/delete/${id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(result => {
            console.log('deleted', result)
            alert('Product Deleted Successfully')
            
        })
    }
    const [loggedInUser, setLoggedInUser] = useContext(paintContext);
    const [manageProducts, setManageProducts] = useState([]);
    useEffect(() => {
        fetch('https://sheltered-fjord-53570.herokuapp.com/manageProduct?email='+loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => setManageProducts(data))
    } , [])
    return (
        <div>
            <div className="page-header">
                <h1>Manage Product</h1>
            </div>
            <Container>
            <Row>
            <Col xs={12} md={4}>
                <div className="sidebar">
                    <ul>
                        <li onClick={() => handleManageProduct()}><span><FontAwesomeIcon icon={faCog} /></span> Mange Product</li>
                        <li onClick={() => handleAddProduct()}><span><FontAwesomeIcon icon={faPlus} /></span> Add Product</li>
                        <li onClick={() => handleEditProduct()}><span><FontAwesomeIcon icon={faEdit} /></span> Edit Product</li>
                    </ul>
                </div>
            </Col>
            <Col xs={12} md={8}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Product Name</th>
                    <th>Weight</th>
                    <th>Price</th>
                    <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {
                    manageProducts.length === 0 && <Spinner animation="border" />                  
                }
            {
                manageProducts.map(paint => 
                <tr>
                    <td>{paint.pName}</td>
                    <td>{paint.weight}</td>
                    <td>{paint.price}</td>
                    <td><span> <FontAwesomeIcon icon={faEdit} /> </span><span onClick={() => deleteProduct(paint._id)}> <FontAwesomeIcon icon={faTrashAlt} /> </span></td>
                </tr>
                )
            }
            </tbody>
            </Table>
            </Col>
            </Row>
            </Container>
        </div>
    );
};

export default ManageProduct;