import { useHistory } from 'react-router-dom'
import { Form , Button, Row, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from  'react-redux'
import { Formik } from 'formik'

import { saveShippingAdress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'


const ShippingView = () => {

    const dispatch = useDispatch()
    const { shippingAddress: {address, city, postalCode, country} } = useSelector(state => state.cart)

    const history = useHistory()

    const submitHandler = (values) => {
        dispatch(saveShippingAdress(values))
        history.push('/payment')
    }

    return (
        <Container>
            <Row>
                <h1>Shipping</h1>

                <CheckoutSteps step1 step2/> 

                <Formik
                    initialValues={{
                        address: address || '',
                        city: city || '',
                        postalCode: postalCode || '',
                        country: country || '',
                    }}

                    validateOnSubmit

                    onSubmit={
                        (values) => {
                            submitHandler(values)
                        }
                    }
                >
                    {
                        ({values, handleSubmit, handleChange}) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="address" className="py-3">
                                    <Form.Label>Address</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter address" 
                                        name="address"
                                        value={values.address} 
                                        onChange={handleChange}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="city" className="py-3">
                                    <Form.Label>City</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter city" 
                                        name="city"
                                        value={values.city} 
                                        onChange={handleChange}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="postalCode" className="py-3">
                                    <Form.Label>Postal code</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter postal code" 
                                        name="postalCode"
                                        value={values.postalCode} 
                                        onChange={handleChange}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Form.Group controlId="country" className="py-3">
                                    <Form.Label>Country</Form.Label>
                                    <Form.Control 
                                        type="text" 
                                        placeholder="Enter country" 
                                        name="country"
                                        value={values.country} 
                                        onChange={handleChange}
                                    >
                                    </Form.Control>
                                </Form.Group>

                                <Button type="submit" variant="primary" disabled={!values.country || !values.postalCode || !values.country || !values.address}>
                                    Continue                                
                                </Button>
                            </Form>
                        )
                    }
                </Formik>
            </Row>
            


        </Container>
    )
}

export default ShippingView