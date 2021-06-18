import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'

import { 
    productDetails,
    createReview, 
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

import { Row, Col, Image,  ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Spinner from '../components/Spinner'
import Message from '../components/Message'

const ProductView = () => {
    const [qty, setQty] = useState(1)
    const [comment, setComment] = useState('')
    const [raiting, setRaiting] = useState(0)

    const { id } = useParams()
    const history = useHistory()

    const dispatch = useDispatch()
    const { product, loading, error } = useSelector(state => state.productDetails)
    const { success: reviewSuccess, loading: reviewLoading, error: reviewError } = useSelector(state => state.productReviewCreate)
    const { userInfo } = useSelector(state => state.userLogin)

    useEffect(() => {
        if(reviewSuccess) {
            setRaiting('')
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }
        dispatch(productDetails(id))
    }, [id, dispatch, reviewSuccess])

    const addToCartHandler = () => {
        history.push(`/cart/${id}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createReview(id, raiting, comment))
    }

    return (
        <div className='product-details'>
            <Link className='btn btn-light my-3' to='/'>Home</Link>
            {
                loading ? <Spinner /> 
                : error ? <Message variant='danger'>{ error }</Message> 
                : (
                    <>
                        <Row>
                            <Col md={5}>
                                <Image src={product.image} alt={product.name} fluid/>
                            </Col>
                            <Col md={4}>
                                <ListGroup varint="flush">
                                    <ListGroup.Item>
                                        <h2 className='my-3'>{product.name}</h2>
                                        <Rating 
                                            value={product.raiting} 
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
                        <Row>
                            {
                                product.reviews && (
                                    <Col md={6} className='my-4'>
                                        <h2>Reviews</h2>
                                        { product.reviews.length === 0
                                            ? <Message >No one reviews</Message>
                                            : (
                                                <ListGroup variant="flush">
                                                    {
                                                        product.reviews.map(r => (
                                                            <ListGroup.Item key={r._id} >
                                                                <strong>{r.name}</strong>
                                                                <Rating value={r.raiting}/>
                                                                <p>{r.createdAt.substring(0, 10)}</p>
                                                                <p>{r.comment}</p>
                                                            </ListGroup.Item>
                                                        ))
                                                    }
                                                </ListGroup>
                                            )
                                        }
                                        
                                        <h4>Write customer review</h4>
                                        { reviewError && <Message variant="danger">{reviewError}</Message> }
                                        {
                                            userInfo ? (
                                                <>
                                                { 
                                                    reviewLoading ? <Spinner />
                                                    : (
                                                        <Form onSubmit={submitHandler}>
                                                            <Form.Group controlId="raiting" className="my-3">
                                                                <Form.Label>Rating</Form.Label>
                                                                <Form.Control
                                                                    as='select'
                                                                    value={raiting}
                                                                    onChange={(e) => setRaiting(e.target.value)}
                                                                >
                                                                    <option value=''>select</option>
                                                                    <option value="1">1 - Poor</option>
                                                                    <option value="2">2 - Fair</option>
                                                                    <option value="3">3 - Note bad</option>
                                                                    <option value="4">4 - Good</option>
                                                                    <option value="5">5 - Greate</option>
                                                                    
                                                                </Form.Control>    
                                                            </Form.Group>
                                                            <Form.Group controlId="comment">
                                                                <Form.Label>Comment</Form.Label>
                                                                <Form.Control
                                                                    as='textarea'
                                                                    row='3'
                                                                    value={comment}
                                                                    onChange={(e) => setComment(e.target.value)}
                                                                >

                                                                </Form.Control>
                                                            </Form.Group>
                                                            <Button
                                                                type='submit'
                                                                variant='primary'
                                                                className="mt-3"
                                                            >leave review</Button>
                                                        </Form>
                                                    )
                                                }
                                                
                                                </>
                                            ) : <Message><Link to='/login'>Sign in to leave review</Link></Message>
                                        }    
                                        
                                    </Col>
                                )
                            }
                        </Row>
                    </>
                )
            }
            
        </div>
    )
}

export default ProductView