import { useParams, useLocation, Link } from 'react-router-dom'
import { Row, Col, Image,  ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import products from '../products'

const ProductView = () => {
    const { id } = useParams()
    const p = products.find(p => p._id === id)

    console.log(useLocation())

    return (
        <div className='product-details'>
            <Link className='btn btn-light my-3' to='/'>Home</Link>
            <Row>
                <Col md={5}>
                    <Image src={p.image} alt={p.name} fluid/>
                </Col>
                <Col md={4}>
                    <ListGroup varint="flush">
                        <ListGroup.Item>
                            <h2 className='my-3'>{ p.name }</h2>
                            <Rating 
                                value={p.rating} 
                                text={`${p.numReviews} reviews`} 
                            />
                        </ListGroup.Item>
                        <ListGroup.Item className="py-3">
                            Price: ${p.price}
                        </ListGroup.Item>
                        <ListGroup.Item className="py-3">
                            Description: {p.description}
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
                                        {p.price}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status:
                                    </Col>
                                    <Col>
                                        {p.countInStock ? `avalibale ${p.countInStock}` : 'out of stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item className="text-center my-2">
                                <Button className="btn btn-dark" type="button" disabled={!p.countInStock}>add to cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductView