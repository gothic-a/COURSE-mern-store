import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form , Button, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from  'react-redux'

import { savePaymentMethod } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentView = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal')

    const dispatch = useDispatch()
    const { shippingAddress } = useSelector(state => state.cart)
    
    const history = useHistory()

    if(!shippingAddress) history.push('/shipping')

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <div>
            <Container>
            <CheckoutSteps step1 step2 step3/>
            <Form onSubmit={submitHandler}>
                <Form.Group className="py-3">
                    <Form.Label as='legend'>Payment method</Form.Label>
                    <Col className="py-2">
                        <Form.Check
                            className="my-1"
                            type='radio'
                            label='Paypal or credit'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>

                        <Form.Check
                            className="my-1"
                            type='radio'
                            label='Credit card'
                            id='liqpay'
                            name='paymentMethod'
                            value='liqpay'
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant="primary">
                    Continue
                </Button>
            </Form>
            </Container>
        </div>
    )
}

export default PaymentView