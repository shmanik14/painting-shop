import React, { useState, useContext } from 'react';
import { paintContext } from '../../App';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
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
    const [loggedInUser, setLoggedInUser] = useContext(paintContext);
    const [imageURL, setImageURL] = useState(null);
    console.log(imageURL)
    const handleImageUpload = event => {
        console.log(event.target.files[0]);
        const imageData = new FormData();
        imageData.set('key', 'ea9e86076a87189ae321024384da284c')
        imageData.append('image', event.target.files[0])
        axios.post('https://api.imgbb.com/1/upload', imageData)
          .then(function (response) {
            setImageURL(response.data.data.display_url);
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        const eventData = {
            pName: data.pName,
            price: data.price,
            weight: data.weight,
            date: new Date().toDateString('dd/MM/yyyy'),
            image: imageURL
        }
        const newBooking = {...loggedInUser, ...eventData};
        const url = `http://localhost:4000/addPaint`;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBooking)
        })
        .then(res => {
            console.log('server');
            alert('Product Added Sucessfully')
        }
        )
        console.log(data)
        console.log(newBooking)
    };
    return (
        <div>
            <div className="page-header">
                <h1>Add Product</h1>
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
           <form onSubmit={handleSubmit(onSubmit)}>
               <label htmlFor="name">Product Name</label>
                <input className="form-control" name="pName" placeholder="Product Name" ref={register} />
                <br/>      
               <label htmlFor="price">Product Price</label>
                <input className="form-control" name="price" placeholder="Price" ref={register} />
                <br/>                             
               <label htmlFor="weight">Product Weight</label>
                <input className="form-control" name="weight" placeholder="Weight" ref={register} />
                <br/>
               <label htmlFor="image">Upload Product Image</label>
                <input className="form-control" name="image" type="file" onChange={handleImageUpload} />
                <br/>
                <input type="submit" />
            </form>
            </Col>
            </Row>
            </Container>
        </div>
    );
};

export default Admin;