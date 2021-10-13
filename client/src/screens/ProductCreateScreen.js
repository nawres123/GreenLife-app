import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { createProduct } from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

const ProductCreateScreen = ({ match, history }) => {
  const [product, setProduct] = useState({});

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [description , setDescription] = useState('')
  const [category , setCategory] = useState('')
  const [uploading , setUploading] = useState(false)

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const {loading, error, success} = productCreate;

  const { loading:loadingCreate, error:errorCreate ,success:successCreate } = productCreate;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data)
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProduct({
      name ,
      price,
      description,
      category,
      image,
      countInStock
    }))
  } 

  useEffect(()=>{
    if(successCreate) {
      dispatch({type: PRODUCT_CREATE_RESET})
      history.push("/admin/productlist");
    }
  }, [loading, error, success, dispatch]);

  return (
    <React.Fragment>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Product</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='price'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>


            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='image'
                placeholder='Enter image Url'
                value={image}
                disabled={true}
                onChange={(e) => setImage(e.target.value)}
              >    
            </Form.Control>
              <Form.File
              id='image-file'
              label ='choose File'
              custom
              onChange={uploadFileHandler}>
              </Form.File>
            </Form.Group>

            <Form.Group controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='description'
                placeholder='Enter description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
              {uploading && <Loader/>}
            </Form.Group>

            <Form.Group controlId='counInStock'>
              <Form.Label>CountInStock</Form.Label>
              <Form.Control
                type='countInStock'
                placeholder='Enter countInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='category'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>
              Create
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  )
}

export default ProductCreateScreen