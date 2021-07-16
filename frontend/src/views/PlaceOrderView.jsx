import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Card, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from  'react-redux'
import Message from '../components/Message'

import { orderCreate } from '../actions/orderActions'

import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = () => {
    const dispatch = useDispatch()
    const { cartItems, shippingAddress, paymentMethod, totalPrice } = useSelector(state => state.cart)
    const { order, success, error } = useSelector(state => state.orderCreate)

    const history = useHistory()

    const totalItemsPrice = +totalPrice.toFixed(2)
    const shippingPrice = totalPrice > 100 ? 0 : 100
    const taxPrice = Number((0.15 * totalPrice).toFixed(2))
    const totalOrderPrice = (+totalPrice + +shippingPrice + +taxPrice).toFixed(2)

    useEffect(() => {
        if(success) history.push(`/order/${order._id}`)
    }, [history, success])

    useEffect(() => {
        if(!shippingAddress) history.push('/shipping')
        else if(!paymentMethod) history.push('/payment')
        else if(!cartItems) history.push('/')
    }, [shippingAddress, paymentMethod, cartItems])

    const placeOrderHandler = () => {
        dispatch(orderCreate({
            orderItems: cartItems,
            shippingAddress,
            paymentMethod,
            totalPrice: totalOrderPrice,
            shippingPrice,
            taxPrice,
            totalOrderPrice
        }))
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row className="pt-3">
                <Col md={8} className="px-3">
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <b>Adress: </b>
                                {shippingAddress.address},
                                {shippingAddress.city},
                                {shippingAddress.postalCode},
                                {shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment method</h2>
                            <p>
                                <b>Method: </b>
                                {paymentMethod === 'liqpay' ? 'Credit card' : paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item className="my-4" >
                            <h2>Order Items</h2>
                            {
                                cartItems.length === 0 
                                ? <Message>Your cart is empty</Message>
                                : (
                                    <ListGroup variant='flush'>
                                        {
                                            cartItems.map((item, index) => (
                                                <ListGroup.Item key={item.product}>
                                                    <Row>
                                                        <Col md={2} className="px-4">
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
                                                        <Col>   
                                                            <Link to={`/products/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
                                                        <Col md={4} >
                                                            {item.qty} x ${item.price} = ${item.qty * item.price}          
                                                        </Col>
                                                    </Row>
                                                </ListGroup.Item>
                                            ))
                                        }
                                    </ListGroup>
                                )
                            }
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item className="pt-3">
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items:</Col>
                                    <Col>${totalItemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping:</Col>
                                    <Col>${shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax:</Col>
                                    <Col>${taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total:</Col>
                                    <Col>${totalOrderPrice}</Col>
                                </Row>
                            </ListGroup.Item>

                            {
                                error && <Message variant="danger">{error}</Message>
                            }   

                            <ListGroup.Item className="py-3">
                                <Button 
                                    type="button" 
                                    className="btn-block" 
                                    disabled={cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>  
                </Col>
            </Row>
        </div>
    )
}

export default PlaceOrderScreen