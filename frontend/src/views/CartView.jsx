import { useState, useEffect } from 'react'
import { Link, useParams, useLocation, useHistory } from 'react-router-dom'
import useQuery from '../utils/useQuery'

import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'


const CartView = () => {
    const { id } = useParams()
    const qty = Number(useQuery().get('qty'))

    const history = useHistory()

    const dispatch = useDispatch()
    const { cartItems } = useSelector(state => state.cart)
    const { userInfo } = useSelector(state => state.userLogin)

    useEffect(() => {
        if(id && qty) {
            dispatch(addToCart(id, qty))
        }
    }, [id, qty])

    const cartRemoveHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const getOrderHandler = () => {
        if(userInfo) history.push('/shipping')
        else history.push(`/login?redirect=shipping`)
    }

    return (
        <div className="cart">
            <Row>
                <Col md={8}>
                   {cartItems.length && (
                        <ListGroup variant="flush">
                            {
                                cartItems.map((p, idx) => {
                                    return (
                                        <Card className="my-2 p-2" key={p.product}>
                                            
                                            <Row>
                                                <Col md={2} >
                                                    <Card.Img src={p.image} />
                                                </Col>
                                                <Col md={4} className="align-middle">
                                                    <h6 className="align-middle">{p.name}</h6>
                                                </Col>
                                                <Col md={2} className="align-middle">
                                                    <span>${p.price}</span>
                                                </Col>
                                                <Col md={2} className="align-middle">
                                                    <Form.Control 
                                                        as="select"
                                                        value={p.qty}
                                                        onChange={e => dispatch(addToCart(p.product, e.target.value))}
                                                    >
                                                        {
                                                            [...Array(p.countInStock).keys()].map(i => {
                                                                return (
                                                                    <option 
                                                                        key={i + 1} 
                                                                        value={i + 1}
                                                                        >
                                                                        {i + 1}
                                                                    </option>
                                                                )
                                                            })
                                                        }
                                                    </Form.Control>
                                                </Col>
                                                <Col 
                                                    md={2} 
                                                    className="align-middle"
                                                >
                                                    <Button variant="light" onClick={() => cartRemoveHandler(p.product)}>
                                                        <i 
                                                            className="fas fa-trash"
                                                    
                                                        >
                                                        </i>
                                                    </Button>
                                                    
                                                </Col>
                                            </Row>

                                        </Card>
                                    )

                                })
                            }
                        </ListGroup>
                   ) } 
                </Col>
                <Col md={4}>
                    <ListGroup className="my-2">
                        <ListGroup.Item className="py-3">
                            <h2>Subtotal
                                (
                                    <span>
                                        {
                                            cartItems.reduce((sum, p) => {
                                                return sum += Number(p.qty)
                                            }, 0)
                                        }
                                        
                                    </span>
                                )
                            </h2>
                        </ListGroup.Item>
                        <ListGroup.Item className="py-3">
                            <Row>
                                <Col md={5}>
                                    Total price:
                                </Col>
                                <Col md={7}>
                                    $
                                    {
                                        cartItems.reduce((sum, p) => {
                                            return sum += p.qty * p.price
                                        }, 0).toFixed(2)
                                    }
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item className="text-center py-2">
                            <Button
                                className="btn btn-dark" 
                                type="button"
                                onClick={getOrderHandler}
                            >
                                get order
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default CartView