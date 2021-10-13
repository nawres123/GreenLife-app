import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Message from '../components/Message';
import Loader from '../components/Loader';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <div className='home'>
      <h1>Soyez Le Bienvenue chez notre monde</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='primary'>{error}</Message>
      ) : (
        <Row>
          {typeof(products) == "object" ? products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          )) : ""}
        </Row>
      )}
    </div>
  );
};

export default HomeScreen;
