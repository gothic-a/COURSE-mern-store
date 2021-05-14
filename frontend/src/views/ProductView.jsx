import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

import { Row, Col, Image,  ListGroup, Card, Button } from 'react-bootstrap'

import Rating from '../components/Rating'

const ProductView = () => {
    const [product, setProduct] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const fetchProduct = async () => {
            const res = await axios.get(`/api/products/${id}`)
            
            setProduct(res.data)
        }

        fetchProduct()
    }, [id])

    return (
        <div className='product-details'>
            <Link className='btn btn-light my-3' to='/'>Home</Link>
            <Row>
                <Col md={5}>
                    <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={4}>
                    <ListGroup varint="flush">
                        <ListGroup.Item>
                            <h2 className='my-3'>{ product.name }</h2>
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
                            <ListGroup.Item className="text-center my-2">
                                <Button className="btn btn-dark" type="button" disabled={!product.countInStock}>add to cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductView