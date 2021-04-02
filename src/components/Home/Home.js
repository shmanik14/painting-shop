import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Spinner from 'react-bootstrap/Spinner';
import Paint from '../Paint/Paint';

const Home = () => {
    const [paints, setPaints] = useState([]);
    useEffect(() => {
        fetch('https://sheltered-fjord-53570.herokuapp.com/paints', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => res.json())
        .then(data => setPaints(data))
    } , [])
    return (
        <div className="home-page">
            <Container>
                <Row>
                    {
                        paints.length === 0 && <Spinner animation="border" />                  
                    }
                    {
                    paints.map(paint => <Paint key={paint._id} paint={paint}></Paint>)
                    }
                </Row>
            </Container>
        </div>
    );
};

export default Home;