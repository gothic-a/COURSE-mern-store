import { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useLocation } from 'react-router-dom'
import { Row, Col, ListGroup, Card, Image } from 'react-bootstrap'
import Spinner from '../components/Spinner'

import { ORDER_PAY_RESET, ORDER_DETAILS_RESET } from '../constants/orderConstants'

import { getOrderById, payOrder } from '../actions/orderActions'
import Message from '../components/Message'

const OrderView = () => {
    const [sdkReady, setSdkReady] = useState(false)
    const [liqData, setLiqData] = useState('')
    const [liqSignature, setLiqSignature] = useState('')

    const dispatch = useDispatch()
    const { id } = useParams()
    const location = useLocation()

    const { order, error, loading } = useSelector(state => state.orderDetails)
    const { loading: payLoading, success: paySuccess } = useSelector(state => state.orderPay)

    useEffect(() => {
        dispatch({type: ORDER_DETAILS_RESET})
    }, [])
    
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/pay/paypal/config')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            
            document.body.appendChild(script)
        }
        
        if(!order || paySuccess) {       
            dispatch({type: ORDER_PAY_RESET})
            dispatch(getOrderById(id))
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [id, dispatch, paySuccess, order, sdkReady])

    useEffect(() => {
        const fetchLiqPayConfig = async () => {
            const configData = {
                order_id: order._id ,
                amount: order.totalPrice,
                currency: 'USD',
                description: `Order: ${order._id}`,
                result_url: `http://localhost:3000${location.pathname}`
            }

            const { data: { data, signature } } = await axios.post('/api/pay/liqpay/config', configData)

            setLiqData(data)
            setLiqSignature(signature)
        }

        if(order) fetchLiqPayConfig()
       
    }, [order])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order._id, paymentResult))
    }

    return (
        <>
            {
            loading ? <Spinner /> 
            : error ? <Message variant="danger">{error}</Message>
            : (
                <>
                    <h1>Order {order._id}</h1>
                    <Row className="pt-3">
                        <Col md={8} className="px-3">
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h2>Shipping</h2>
                                    <div><strong>Name: </strong> {order.user.name}</div> 
                                    <div><strong>Email: </strong> <a href={`mailto:${order.user.email}`}> { order.user.email}</a></div> 
                                    <p>
                                        <b>Adress: </b>
                                        {order.shippingAddress.address},
                                        {order.shippingAddress.city},
                                        {order.shippingAddress.postalCode},
                                        {order.shippingAddress.country}
                                    </p>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <h2>Payment method</h2>
                                    
                                    <p>
                                        <b>Method: </b>
                                        {order.paymentMethod}
                                    </p>
                                    {
                                        order.isPaid 
                                        ? <Message variant="success">Paid on {order.paidAt}</Message> 
                                        : <Message variant="danger">Not paid</Message> 
                                    }
                                    {
                                        order.isDilivered 
                                        ? <Message variant="success">Delivired on {order.deliveredAt}</Message> 
                                        : <Message variant="danger">Not delivered</Message> 
                                    }
                                </ListGroup.Item>

                                <ListGroup.Item className="my-4" >
                                    <h2>Order Items</h2>
                                    {
                                        order.orderItems.length === 0 
                                        ? <Message>Order is empty</Message>
                                        : (
                                            <ListGroup variant='flush'>
                                                {
                                                    order.orderItems.map((item, index) => (
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
                                            <Col>${order.totalPrice - order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Shipping:</Col>
                                            <Col>${order.shippingPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Tax:</Col>
                                            <Col>${order.taxPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Total:</Col>
                                            <Col>${order.totalPrice}</Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {
                                        
                                        !order.isPaid &&
                                            
                                                <> {
                                                order.paymentMethod === 'PayPal' 
                                                && 
                                                <ListGroup.Item>
                                                    { 
                                                        payLoading && <Spinner /> 
                                                    }
                                                    {
                                                        !sdkReady 
                                                        ? <Spinner /> 
                                                        : <PayPalButton 
                                                            amount={order.totalPrice}
                                                            onSuccess={successPaymentHandler}
                                                        />
                                                    }
                                                </ListGroup.Item>
                                                }
                                                {
                                                order.paymentMethod === 'liqpay' 
                                                && 
                                                <ListGroup.Item>
                                                    {
                                                        payLoading && <Spinner />
                                                    }
                                                    {
                                                        !liqData || !liqSignature
                                                        ? <Spinner />
                                                        : (
                                                            <form 
                                                                method="POST" 
                                                                target="_blank"
                                                                action="https://www.liqpay.ua/api/3/checkout" 
                                                                acceptCharset="utf-8" 
                                                                style={{display: 'flex', justifyContent: 'center'}}
                                                            >
                                                                <input type="hidden" name="data" value={liqData}/>
                                                                <input type="hidden" name="signature" value={liqSignature}/>
                                                                <input type="image" alt="liqpay" src="http://static.liqpay.ua/buttons/p1ru.radius.png"/>
                                                            </form>
                                                        )
                                                    }
                                                </ListGroup.Item>
                                                }
                                        </>
                                    }
                                </ListGroup>
                            </Card>  
                        </Col>
                    </Row>
                </>
            )
            }
        </>    
    )
}

export default OrderView