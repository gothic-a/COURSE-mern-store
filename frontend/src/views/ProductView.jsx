import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'

import { productDetails } from '../actions/productActions'

import { Row, Col, Image,  ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Spinner from '../components/Spinner'
import Message from '../components/Message'

const ProductView = () => {
    const [qty, setQty] = useState(1)

    const { id } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    const { product, loading, error } = useSelector(state => state.productDetails)

    useEffect(() => {
        dispatch(productDetails(id))
    }, [id, dispatch])

    const addToCartHandler = () => {
        history.push(`/cart/${id}?qty=${qty}`)
    }

    console.log(qty)

    return (
        <div className='product-details'>
            <Link className='btn btn-light my-3' to='/'>Home</Link>
            {
                loading ? <Spinner /> 
                : error ? <Message variant='danger'>{ error }</Message> 
                : (
                    <Row>
                        <Col md={5}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={4}>
                            <ListGroup varint="flush">
                                <ListGroup.Item>
                                    <h2 className='my-3'>{product.name}</h2>
                                    <Rating 
                                        value={product.rating} 
                                        text={`${product.numReviews} reviews`} 
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item className="py-3">
                                    Price: ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item className="py-3">
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Price:
                                            </Col>
                                            <Col>
                                                {product.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Status:
                                            </Col>
                                            <Col>
                                                {product.countInStock ? `avalibale ${product.countInStock}` : 'out of stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>
                                                    Qty
                                                </Col>
                                                <Col>
                                                    <Form.Control 
                                                        as="select"
                                                        value={qty}
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {
                                                            [...Array(product.countInStock).keys()].map(i => {
                                                                return (
                                                                    <option value={i + 1} key={i + 1}>
                                                                        {i + 1}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item className="text-center my-2">
                                        <Button 
                                            className="btn btn-dark" 
                                            type="button" 
                                            disabled={!product.countInStock}
                                            onClick={addToCartHandler}
                                        >
                                            add to cart
                                    </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )
            }
            
        </div>
    )
}

export default ProductView