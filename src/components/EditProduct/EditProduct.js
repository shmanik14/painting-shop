import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const EditProduct = () => {
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
    return (
        <div>
            <div className="page-header">
                <h1>Edit Product</h1>
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
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EditProduct;