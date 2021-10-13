import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Product = ({ product }) => {
  return (
    <Card  style={{border:'15 px'}} className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant='top' />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as='div'>
            <h6>
              <strong style={{justifyContent:'center',color:'black',}}>{product.name}</strong>
            </h6>
          </Card.Title>
        </Link>
        <Card.Text as='div'>
          <p>{product.price} TND</p>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
