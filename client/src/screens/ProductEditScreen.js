import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails , updateProduct} from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [countInStock, setCountInStock] = useState('')
  const [description , setDescription] = useState('')
  const [category , setCategory] = useState('')
  const [uploading , setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const { loading:loadingUpdate, error:errorUpdate ,success:successUpdate } = productUpdate
  
  
  useEffect(() => {

    if(successUpdate) {
        dispatch({type:PRODUCT_UPDATE_RESET})
        history.push('/admin/productlist')
    }
     else {
       if (!product.name || product._id !== productId) {
            dispatch(listProductDetails(productId))
          } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setDescription(product.description)
            setCategory(product.category)
            setCountInStock(product.countInStock)
     } 
      }
    }
  , [dispatch, history, productId, product ,successUpdate])

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

      const { data } = await axios.post('/api/upload', formData, config)

      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }


  const submitHandler = (e) => {
    e.preventDefault()
  dispatch(updateProduct({
      _id:productId ,
      name ,
      price,
      description,
      category,
      image,
      countInStock
  }))
  } 

return (
    <React.Fragment>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </React.Fragment>
  )
}

export default ProductEditScreen